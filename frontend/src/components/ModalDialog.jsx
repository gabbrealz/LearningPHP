export default function ModalDialog({ data }) {
  if (!data.show) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/60">
      <div className="fixed top-1/2 left-1/2 -translate-1/2 w-100 bg-white rounded-lg flex flex-col">
        {
          data.title === undefined ? null :
            <h3 className="px-6 py-2 shadow-lg rounded-t-lg">
              {data.title}
            </h3>
        }
        {
          data.caption === undefined ? null :
            <div className="px-6 py-4 text-sm">
              {data.caption}
            </div>
        }
        <div className="h-fit px-6 pt-2 pb-4 flex justify-end gap-2">
          {
            data.buttons.map((button, index) => (
              <button key={index} className="text-white bg-black px-4 py-1 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                      onClick={button.onClick}>
                {button.content}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}