"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { emailOrderHistory } from "./_actions/order";

const OrderPage = () => {
  const [data, action] = useFormState(emailOrderHistory, {});
  return (
      <form action={action} className="max-w-2xl mx-auto my-10 h-screen">
        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
            <CardDescription>
              Enter your email and we will send you your order history and
              download links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your email"
              />
              {data.error && (
                <div className="text-destructive">{data.error}</div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {data.message ? <p>{data.message}</p> : <SubmitButton />}
          </CardFooter>
        </Card>
      </form>
  );
};

export default OrderPage;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" variant={"black"} size={"lg"}>
      {pending ? "Sending" : "Send"}
    </Button>
  );
}
