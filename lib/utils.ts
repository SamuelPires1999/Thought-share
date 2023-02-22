import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// THIS IS USED TO CONDITIONALY ADD TAILWIND CLASSES
// READ: https://ui.shadcn.com/docs/installation#add-a-cn-helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
