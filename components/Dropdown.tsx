"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  AnimatePresence,
} from "motion/react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ options, value, onChange, placeholder = "Select an option", className }, ref) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    // close on outside click
    React.useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options.find((o) => o.value === value);

    return (
      <motion.div
        ref={containerRef}
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input relative rounded-lg p-[2px] transition duration-300"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            `border-[#e7e5e4] border shadow dark:placeholder-text-neutral-600 flex h-10 w-full items-center justify-between rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600`,
            className,
          )}
        >
          <span
            className={cn(
              selected ? "text-black dark:text-white" : "text-neutral-400",
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-neutral-400 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-auto rounded-md border border-[#e7e5e4] bg-white p-1 shadow-lg dark:border-neutral-700 dark:bg-zinc-800"
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange?.(option.value);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm text-black transition-colors dark:text-white",
                        "hover:bg-gray-100 dark:hover:bg-zinc-700",
                        isSelected && "bg-gray-100 dark:bg-zinc-700",
                      )}
                    >
                      {option.label}
                      {isSelected && (
                        <Check className="h-4 w-4 text-blue-500" />
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
);
Dropdown.displayName = "Dropdown";

export { Dropdown };