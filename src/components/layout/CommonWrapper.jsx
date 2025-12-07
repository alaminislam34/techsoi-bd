export default function CommonWrapper({children}){
    return (
        <div className="max-w-[1520px] md:w-[80%] w-[calc(100%-2rem)] mx-auto my-6">
            {children}
        </div>
    );
}