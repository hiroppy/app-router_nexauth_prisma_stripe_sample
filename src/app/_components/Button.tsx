type Props = JSX.IntrinsicElements["button"];

export function Button({ children, ...rest }: Props) {
  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...rest}
    >
      {children}
    </button>
  );
}
