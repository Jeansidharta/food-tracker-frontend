import { useDishesList } from "../../../api/dishes";
import {
  NewMealRequest,
  useMealDescriptions,
  useNewMeal,
} from "../../../api/meals";
import {
  ActionIcon,
  Anchor,
  Autocomplete,
  Button,
  Group,
  NumberInput,
  Rating,
  Select,
  Stepper,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../router/routes";

type FormValues = {
  eat_date?: Date;
  duration: string;
  description: string;
  hunger_level: number;
  desire_to_eat: number;
  fullness_afterwards: number;
  dishes: { dish_id: ""; weight: string }[];
};

enum STEPS {
  "DESCRIPTION",
  "DISHES",
  "EAT_DATE",
  "RATING",
  length,
}

function formValuesToRequest(values: FormValues): NewMealRequest {
  return {
    ...values,
    duration: Number.parseInt(values.duration),
    dishes: values.dishes.map((i) => ({
      ...i,
      dish_id: Number.parseInt(i.dish_id),
      weight: Number.parseInt(i.weight),
    })),
    eat_date: values.eat_date?.getTime(),
  };
}

export const PageNewMeal: FC<{}> = ({}) => {
  const [active, setActive] = useState<STEPS>(0);
  const { data: dishesList, isLoading } = useDishesList();
  const { isMutating, newMeal } = useNewMeal();
  const { data: mealDescriptions } = useMealDescriptions();

  const form = useForm<FormValues>({
    initialValues: {
      eat_date: new Date(),
      duration: "",
      description: "",
      hunger_level: 0,
      desire_to_eat: 0,
      fullness_afterwards: 0,
      dishes: [{ dish_id: "", weight: "0" }],
    },

    validate: (values) => {
      if (active === STEPS.DISHES) {
        const problems: Record<string, string> = {};
        if (values.dishes.length == 0) {
          problems.dishes = "You must have at least one dish in your meal";
        }
        values.dishes.forEach(({ dish_id, weight }, index) => {
          if (!dish_id) {
            problems[`dishes.${index}.dish_id`] = "You must provide a dish";
          }
          if (!weight) {
            problems[`dishes.${index}.weight`] = "You must provide a weight";
          }
          if (weight === "0") {
            problems[`dishes.${index}.weight`] = "Weight cannot be zero";
          }
        });

        return problems;
      }
      if (active === STEPS.EAT_DATE) {
        if (values.eat_date && !values.duration) {
          return {
            duration:
              "If you provide a eat date, you must also provide a meal duration",
          };
        }
        if (!values.eat_date && values.duration) {
          return {
            eat_date:
              "If you provide a meal duration, you must also provide an eat date",
          };
        }
      }

      return {};
    },
  });

  const nextStep = async () => {
    if (form.validate().hasErrors) {
      return;
    }
    if (active == STEPS.RATING) {
      await newMeal(formValuesToRequest(form.values));
      setActive(3);
    }
    setActive((current) => (current < STEPS.length ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div>
      <h1>New Meal</h1>

      <Stepper active={active}>
        <Stepper.Step>
          <h2>What meal is this?</h2>
          <Autocomplete
            label="Meal description"
            placeholder="Ex: lunch, dinner, etc..."
            data={mealDescriptions ?? []}
            {...form.getInputProps(`description`)}
          />
        </Stepper.Step>
        <Stepper.Step>
          <h2>What are you eating?</h2>
          {!isLoading && dishesList?.length == 0 ? (
            <>
              You havent registered any dishes yet.{" "}
              <Anchor component={Link} to={ROUTES.DISH.NEW.path} variant="fill">
                Create a dish?
              </Anchor>
            </>
          ) : (
            <>
              {form.values.dishes.map((_dish, index) => (
                <Group key={index} mt="xs">
                  <Select
                    placeholder="Select a dish"
                    data={(dishesList || []).map((dish) => ({
                      value: dish.id.toString(),
                      label: dish?.name || "",
                    }))}
                    searchable
                    {...form.getInputProps(`dishes.${index}.dish_id`)}
                  />
                  <NumberInput
                    placeholder="Grams"
                    style={{ width: 140 }}
                    min={0}
                    suffix="g"
                    thousandSeparator="_"
                    hideControls
                    {...form.getInputProps(`dishes.${index}.weight`)}
                  />
                  <ActionIcon
                    color="red"
                    onClick={() => form.removeListItem("dishes", index)}
                  >
                    <IconTrash size="1rem" />
                  </ActionIcon>
                </Group>
              ))}
              <Group justify="center" mt="md">
                <Button
                  onClick={() =>
                    form.insertListItem("dishes", {
                      name: "",
                      active: false,
                      key: randomId(),
                    })
                  }
                >
                  Add Dish
                </Button>
              </Group>
            </>
          )}
        </Stepper.Step>
        <Stepper.Step>
          <h2>Eating time</h2>
          <Group grow>
            <DateTimePicker
              clearable
              label="When did you eat?"
              valueFormat="YYYY/MM/DD - HH[h] MM[m]"
              placeholder="Pick date"
              {...form.getInputProps("eat_date")}
            />
            <NumberInput
              label="Meal Duration"
              placeholder="Minutes"
              style={{ width: 140 }}
              min={1}
              suffix="min"
              thousandSeparator="_"
              hideControls
              {...form.getInputProps("duration")}
            />
          </Group>
        </Stepper.Step>
        <Stepper.Step>
          <h2>Hunger levels</h2>
          <h3>How hungry were you?</h3>
          <Group>
            <div>No hunger</div>
            <Rating count={10} {...form.getInputProps("hunger_level")} />
            <div>Starving</div>
          </Group>
          <h3>How was your desire to eat?</h3>
          <Group>
            <div>No desire</div>
            <Rating count={10} {...form.getInputProps("desire_to_eat")} />
            <div>High desire</div>
          </Group>
          <h3>How full were you after?</h3>
          <Group>
            <div>As empty as before eating</div>
            <Rating count={10} {...form.getInputProps("fullness_afterwards")} />
            <div>Overflowing</div>
          </Group>
        </Stepper.Step>
        <Stepper.Completed>
          <h2>Dish created successfuly!</h2>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== STEPS.length && (
          <Button onClick={nextStep} loading={isMutating}>
            Next step
          </Button>
        )}
        {active === STEPS.length && (
          <Button component={Link} to={ROUTES.MEAL.path}>
            Done!
          </Button>
        )}
      </Group>
    </div>
  );
}
