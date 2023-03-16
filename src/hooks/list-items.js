import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "context/auth";
import { client } from "utils/client";
import { setQueryDataForMovie } from "./movies";

function useListItems() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["list-items"],
    queryFn: () =>
      client("list-items", { token: user.token }).then((data) =>
        data.listItems.map((listItem) => {
          return {
            id: listItem.id,
            finishDate: listItem.finishDate,
            movie: {
              id: listItem.movie._id,
              url: listItem.movie.ImageURL,
              title: listItem.movie.Title,
              director: listItem.movie.Director.Name,
              genre: listItem.movie.Genre.Name,
              description: listItem.movie.Description,
              release: listItem.movie.Release,
            },
            movieId: listItem.movieId,
            notes: listItem.notes,
            ownerId: listItem.ownerId,
            rating: listItem.rating,
            startDate: listItem.startDate,
          };
        })
      ),
    onSuccess: (listItems) => {
      for (const listItem of listItems)
        setQueryDataForMovie(queryClient, listItem.movie);
    },
  });

  return { ...result, listItems: result.data };
}

function useListItem(movieId) {
  const result = useListItems();
  const listItem =
    result?.listItems?.find((li) => li.movieId === movieId) ?? null;
  return { ...result, listItem };
}

function useCreateListItem() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const results = useMutation({
    mutationFn: ({ movieId }) =>
      client("list-items", { data: { movieId }, token: user.token }),
    onSettled: () => queryClient.invalidateQueries("list-items"),
  });
  return results;
}

function useRemoveListItem() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) =>
      client(`list-items/${id}`, {
        method: "DELETE",
        token: user.token,
      }),
    onSettled: () => queryClient.invalidateQueries("list-items"),
  });
}

function useUpdateListItem(options) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
      }),
    onSettled: () => queryClient.invalidateQueries("list-items"),
    ...options,
  });
}
function useUpdateOptimisticListItem(options) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
      }),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["list-items"] });
      const previousItem = queryClient.getQueryData(["list-items"]);
      queryClient.setQueryData(["list-items"], (old) =>
        old.map((item) => {
          return item.id === newItem.id ? { ...item, ...newItem } : item;
        })
      );
      return { previousItem };
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(["list-items"], context.previousItem);
    },
    onSettled: () => queryClient.invalidateQueries("list-items"),
    ...options,
  });
}

export {
  useListItems,
  useListItem,
  useCreateListItem,
  useRemoveListItem,
  useUpdateListItem,
  useUpdateOptimisticListItem,
};
