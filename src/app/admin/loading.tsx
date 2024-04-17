import { Loader2 } from "lucide-react";

const AdminLoading = () => {
  return (
    <span className="w-full h-svh flex items-center justify-center">
      <Loader2 className="size-10 animate-spin" />
    </span>
  );
}

export default AdminLoading
