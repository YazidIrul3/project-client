type Props = {
  value: string;
  className: String;
};

const AvatarCard = ({ value }: Props) => {
  return (
    <div className=" bg-red-600 text-slate-50 font-bold w-fit text-2xl px-5 py-3 flex justify-center items-center rounded-xl">
      {value}
    </div>
  );
};

export default AvatarCard;
