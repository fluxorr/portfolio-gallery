import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "",
    {
        variants: {
            variant: {
                primary: " bg-white/80 text-black/80 px-4 py-2 rounded-full font-semibold cursor-pointer hover:bg-white/90  ",
                secondary: "bg-white/10 text-white font-semibold rounded-full px-4 py-2 border border-neutral-400/30 cursor-pointer hover:bg-white/20",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const Button: React.FC<ButtonProps> = ({ variant, className, ...props }) => {
    return (
        <button className={cn(buttonVariants({ variant }), className)} {...props}>
            {props.children}
        </button>
    );
};

export default Button;
