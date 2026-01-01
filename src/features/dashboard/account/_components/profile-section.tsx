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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/features/api/user/update-user";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { useCurrentWorkspace } from "../../_hooks/use-current-workspace";
import { updateUserSchema, UpdateUserSchema } from "@/features/schema/user";

export const ProfileSection = () => {
  const [nameInputValue, setNameInputValue] = useState<string>("");
  const { data: profile, isLoading: fetchProfileLoading } = useGetProfile(
    authClient.useSession().data?.session.token
  );
  const { mutate: updateUserMutation, isPending: updateUserLoading } =
    useUpdateUser({
      mutationConfig: {
        onSuccess: () => {
          toast.success("update user success");
        },
      },
      token: authClient.useSession().data?.session.token!,
      id: authClient.useSession().data?.user?.id!,
    });
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
  });
  const { control } = form;

  const handlenameInputValue = (value: string) => {
    setNameInputValue(value);

    return nameInputValue;
  };

  const handleUpdateUser = () => {
    updateUserMutation({
      name: nameInputValue,
      number_phone: nameInputValue,
      timezone: nameInputValue,
    });
  };

  useEffect(() => {
    if (profile?.data) {
      form.reset({
        name: profile.data.name,
        number_phone: profile.data.number_phone,
        timezone: profile.data.timezone,
      });

      setNameInputValue(profile.data.name);
    }
  }, [profile, form]);

  return (
    <section>
      {fetchProfileLoading ? (
        <Spinner className=" " />
      ) : (
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
                    {profile?.data.name[0]}
                  </div>

                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl className=" lg:w-9/12 w-full">
                          <Input
                            {...field}
                            placeholder="Type your name"
                            value={nameInputValue}
                            onChange={(e) => setNameInputValue(e.target.value)}
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
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose Your Timezone</FormLabel>
                        <FormControl className=" lg:w-9/12 w-full">
                          <Select>
                            <SelectTrigger value={"tes"}>
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
      )}
    </section>
  );
};
