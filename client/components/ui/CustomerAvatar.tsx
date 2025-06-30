import { cn } from "@/lib/utils";

interface CustomerAvatarProps {
  initial: string;
  className?: string;
}

export function CustomerAvatar({ initial, className }: CustomerAvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-7 h-7 rounded-full bg-slate-400 text-white text-sm font-medium flex-shrink-0",
        className,
      )}
    >
      {initial}
    </div>
  );
}
