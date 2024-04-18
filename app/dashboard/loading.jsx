export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="p-4 md:pt-8 bg-slate-100 ">
      <ul>
        <li className="p-2 m-8 bg-slate-200 min-h-10 block rounded shadow animate-pulse"></li>
        <li className="p-2 m-8 bg-slate-200 min-h-10 block rounded shadow animate-pulse"></li>
        <li className="p-2 m-8 bg-slate-200 min-h-10 block rounded shadow animate-pulse"></li>
        <li className="p-2 m-8 bg-slate-200 min-h-10 block rounded shadow animate-pulse"></li>
      </ul>
    </div>
  );
}

// {
//   <div className="flex  justify-end">
//     <p className=""></p>
//   </div>;
// }
