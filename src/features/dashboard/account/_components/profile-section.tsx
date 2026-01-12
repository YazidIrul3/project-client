"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetProfile } from "../../../api/user/get-profile";
import AccountLayout from "../_components/account-layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  updateUserSchema,
  UpdateUserSchema,
  useUpdateUser,
} from "@/features/api/user/update-user";
import { useLoading } from "@/hooks/use-loading";
import { useAuthenticated } from "@/hooks/use-authenticated";

export const ProfileSection = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { token, user } = useAuthenticated();
  const { data: profile, isLoading: fetchProfileLoading } = useGetProfile(
    token as string
  );
  const { mutate: updateUserMutation, isPending: updateUserLoading } =
    useUpdateUser({
      mutationConfig: {
        onSuccess: () => {
          toast.success("update user success");
        },
      },
      token: token,
      id: user?.id as string,
    });
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      name: profile?.data?.name,
      number_phone: profile?.data?.number_phone,
      timezone: profile?.data?.timezone,
    },
  });
  const { control, getValues } = form;

  const handleUpdateUser = () => {
    updateUserMutation({
      name: getValues("name"),
      number_phone: getValues("number_phone"),
      timezone: getValues("timezone"),
    });
  };

  useEffect(() => {
    if (fetchProfileLoading) setIsLoading(true);

    form.reset({
      name: getValues("name"),
      number_phone: getValues("number_phone"),
      timezone: getValues("timezone"),
    });
    setIsLoading(false);
  }, [fetchProfileLoading]);

  return (
    <section>
      <AccountLayout>
        <div className=" flex flex-col gap-4  ">
          <Form {...form}>
            <Card className=" ">
              <CardHeader>
                <CardTitle className=" font-bold">Overview</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-3">
                <h4 className=" font-semibold">Avatar</h4>
                <div className=" bg-red-600 text-slate-50 font-bold w-fit text-2xl px-5 py-3 flex justify-center items-center rounded-xl">
                  {getValues("name")?.charAt(0)}
                </div>
                <FormField
                  control={control}
                  name="name"
                  defaultValue={getValues("name")}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl className="lg:w-9/12 w-full">
                        <Input
                          {...field}
                          name="name"
                          placeholder="Type your name"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className=" w-fit"
                  type="button"
                  onClick={handleUpdateUser}
                  disabled={updateUserLoading}
                >
                  Save
                </Button>
              </CardContent>
            </Card>

            <Card className=" ">
              <CardHeader>
                <CardTitle>Timezone</CardTitle>
                <CardDescription>
                  Set your timezone for send notification
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-3">
                <FormField
                  control={control}
                  defaultValue={getValues("timezone")}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Your Timezone</FormLabel>
                      <FormControl className="lg:w-9/12 w-full">
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timezone" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="est">EST</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className=" w-fit"
                  type="button"
                  onClick={handleUpdateUser}
                  disabled={updateUserLoading}
                >
                  Save
                </Button>
              </CardContent>
            </Card>
          </Form>
        </div>
      </AccountLayout>
    </section>
  );
};
