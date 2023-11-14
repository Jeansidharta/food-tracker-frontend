import { useNewIngredient } from "../../../api/ingredients";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../router/routes";
import { FC } from "react";

type ExtractFormValue<T> = T extends ReturnType<typeof useForm<infer V>>
  ? V
  : never;

export const PageNewIngredient: FC<{}> = ({}) => {
  const navigate = useNavigate();
  const { newIngredient, isMutating } = useNewIngredient();
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value ? null : "You must provide a name"),
    },
  });

  async function handleSubmit(values: ExtractFormValue<typeof form>) {
    await newIngredient({ name: values.name });
    navigate(ROUTES.INGREDIENT.path);
  }

  return (
    <div>
      <h1>New ingredient</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Ingredient Name"
          placeholder="ex: potatoes"
          {...form.getInputProps("name")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={isMutating}>
            Done!
          </Button>
        </Group>
      </form>
    </div>
  );
}
