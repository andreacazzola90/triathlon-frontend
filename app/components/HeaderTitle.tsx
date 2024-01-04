export default function HeaderTitle({
  title,
  description,
  theme = "primary",
}: {
  title: string;
  description?: string;
  theme?: string;
}) {
  return (
    <div className="headerTitle">
      <h1 className="title font-bold uppercase ">{title}</h1>
      {description && (
        <>
          <div className="divider"></div>
          <h2 className="description font-bold  uppercase">{description}</h2>
        </>
      )}
    </div>
  );
}
