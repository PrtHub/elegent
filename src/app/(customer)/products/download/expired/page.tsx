import { Button } from "@/components/ui/button";
import Link from "next/link";

const Expired = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">Download link expired</h1>
      <Button asChild size="lg">
        <Link href="/orders">Get New Link</Link>
      </Button>
    </div>
  );
};

export default Expired;
