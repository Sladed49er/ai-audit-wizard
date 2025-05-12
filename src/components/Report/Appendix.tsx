export default function Appendix({ stack }:{stack:any[]}) {
  return (
    <div className="card">
      <h2 className="font-semibold">Appendix – full stack detail</h2>
      <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded">
{JSON.stringify(stack, null, 2)}
      </pre>
    </div>
  );
}
