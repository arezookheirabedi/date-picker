interface IAccessDenied {
  id?: string;
}

const AccessDenied: React.FC<IAccessDenied> = ({id}) => {
  return (
    <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
      <div className="p-20" id={id}>
        <div className="text-red-500 text-center">عدم دسترسی</div>
      </div>
    </div>
  );
};

export default AccessDenied;
