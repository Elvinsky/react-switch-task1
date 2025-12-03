import { useLoaderData } from "react-router";
import CodeSnippet from "../../components/Snippet/CodeSnippet";
import type { SnippetData } from "../../types/snippets.types";

export default function Home() {
  const snippets = useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {snippets.data.data.map((snippet: SnippetData) => (
        <CodeSnippet key={snippet.id} snippet={snippet} onClick={() => {}} />
      ))}
    </div>
  );
}
