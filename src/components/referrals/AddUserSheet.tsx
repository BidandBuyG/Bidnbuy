import { ArrowLeft, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Separator } from "../ui/separator";
import AddUserImg from "../../assets/addUser.png";
import NameIcon from "../../assets/nameicon.png";
import EmailIcon from "../../assets/email.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { CustomToast } from "../CustomToast";
import SucessImg from "../../assets/sucessUser.png";

export type ReferralInfo = {
  id: string;
  profileImg: string;
  name: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  category: string;
};

export const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  gender: z.string().min(2, {
    message: "Please select a gender.",
  }),
  telephone: z.string().min(11, {
    message: "Phone Number must be at least 11 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  category: z.string().min(2, {
    message: "Please select a category.",
  }),
});

export function AddUserSheet({
  side = "right",
  open,
  onOpenChange,
}: {
  side?: "left" | "right" | "top" | "bottom";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    console.log({ data });
    CustomToast({
      imageUrl: SucessImg,
      onViewUser: () => {
        /* handle view user */
      },
      onAddAnother: () => {
        /* handle add another */
      },
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className="flex h-screen w-full flex-col bg-[#00191F] text-white sm:max-w-md border-[#00191F]"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl">
            <div className="flex items-center gap-3 text-white justify-between w-[60%]">
              <div>
                <ArrowLeft />
              </div>

              <div>
                Add
                <span className="text-[#E8FFFD80]"> User</span>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4 bg-[#E8FFFD33]" />

        <ScrollArea className="flex-1 w-full pr-4">
          <div className="mt-4 space-y-4 w-full">
            <img
              src={AddUserImg}
              className="h-[160px] w-[160px] object-cover rounded-md"
            />

            <div className="mt-[3em]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 w-[95%] mx-auto mb-10"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <div className="relative">
                          <img
                            src={NameIcon}
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white"
                          />

                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter first name"
                              autoComplete="name"
                              className="pl-9 h-12 rounded-lg bg-[#007F931F] border-[#0a1b1d] text-white placeholder:text-white"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <div className="relative">
                          <img
                            src={NameIcon}
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white"
                          />

                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter last name"
                              autoComplete="name"
                              className="pl-9 h-12 rounded-lg bg-[#007F931F] border-[#0a1b1d] text-white placeholder:text-white"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter phone number"
                              autoComplete="tel"
                              className="pl-9 h-12 rounded-lg bg-[#007F931F] border-[#0a1b1d] text-white placeholder:text-white"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <div className="relative">
                          <img
                            src={EmailIcon}
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white"
                          />

                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter email address"
                              autoComplete="email"
                              className="pl-9 h-12 rounded-lg bg-[#007F931F] border-[#0a1b1d] text-white placeholder:text-white"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="vendor">vendor</SelectItem>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="marketer">Marketer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mt-3"
                  >
                    Add
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
