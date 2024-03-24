const TextInput = (props) => {
  return (
    <textarea
      placeholder='Enter text here'
      className="bg-transparent border border-dashed border-theme p-4 rounded-lg cursor-pointer w-full h-[100px] text-tc-secondary"
      {...props}
    ></textarea>
  );
};

export default TextInput;
