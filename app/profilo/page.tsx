import UserProfile from "../components/UserProfile";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const Profilo = (props: Props) => {
  const searchParams = props.searchParams;
  const idUser: string = searchParams.userId?.toString() || "";

  return (
    <main className="flex flex-col items-center">
      <h1>Profilo {idUser}</h1>
      <UserProfile id={idUser} />
    </main>
  );
};

export default Profilo;
