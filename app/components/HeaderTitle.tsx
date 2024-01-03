export default function HeaderTitle({
  title,
  theme = "primary",
}: {
  title: string;
  theme?: string;
}) {
  return (
    <h1
      className={`text-2xl font-bold ${
        theme === "" ? "text-white" : "text-black"
      }`}
    >
      {title}
    </h1>
  );
}
