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
    <div className="headerTitle  py-5">
      <div className="relative">
        <span className="title text-6xl  font-bold uppercase  headerOutline text-transparent absolute">
          {title}
        </span>
        <h1 className="title text-5xl text-center font-bold uppercase text-red ">
          {title}
        </h1>
      </div>
      {description && (
        <>
          <div className="divider w-10 after:bg-red before:bg-red mx-auto"></div>
          <h2
            className="description font-bold text-center  uppercase text-2xl"
            dangerouslySetInnerHTML={{ __html: description }}
          ></h2>
        </>
      )}
    </div>
  );
}
