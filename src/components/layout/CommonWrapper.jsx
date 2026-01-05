export default function CommonWrapper({ children }) {
  return (
    <div className="max-w-[1520px] md:w-[90%] w-[calc(100%-2rem)] mx-auto ">
      {children}
    </div>
  );
}
