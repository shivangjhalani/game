export const Container = ({ children, className = '' }) => {
  return (
    <div className={`
      w-full max-w-[90rem] 
      mx-auto px-4 sm:px-6 lg:px-8
      ${className}
    `}>
      {children}
    </div>
  );
};