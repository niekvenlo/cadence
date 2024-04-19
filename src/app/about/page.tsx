import Link from "next/link";

export default function About() {
  return (
    <main>
      <p>
        This is app created for Move, in response to their coding challenge.
      </p>
      <p>
        It is a to-do app, but with a twist: it is specifically designed for
        repetitive actions, like replacing your toothbrush, that we all{" "}
        <em>know</em> we should do{" "}
        <Link
          href="https://www.google.com/search?q=how+often+should+you+replace+your+toothbrush"
          target="_blank"
        >
          every three months
        </Link>
        , but who can remember when they last changed their toothbrush?
      </p>
      <p>
        So in Cadence, when you mark a task as completed, it doesn&lsquo;t
        disappear. Instead, it is automatically rescheduled to, for example, 90
        days from now (even if you were a little late).
      </p>
      <p>
        <Link href="/">Have a look at the app</Link>, and play around with the
        default tasks.
      </p>
    </main>
  );
}
