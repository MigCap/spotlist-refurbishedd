import useRandomColor from '@/hooks/useRandomColor';

function TopSection({
  imgUrl,
  Content,
}: {
  imgUrl: string;
  Content(): JSX.Element;
}) {
  const color = useRandomColor();

  return (
    <>
      <section
        className={`bg-gradient-to-b flex flex-col ${color} md:h-96 items-center py-3 px-8 md:p-8 pt-20 md:space-x-7 text-white to-black md:flex-row`}
      >
        <img
          className='h-[90%] shadow-2xl w-[90%] md:h-44 md:w-44'
          src={imgUrl}
          alt=''
        />
        <div className='my-1'>
          <Content />
        </div>
      </section>
    </>
  );
}

export default TopSection;
