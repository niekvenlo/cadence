import styled from "styled-components";

const Button = styled.button<{ $isPrimary: boolean }>`
  font-weight: ${(props) => (props.$isPrimary ? "bold" : "inherit")};
  padding: 0.5em 1em;
`;

export default function BasicButton({
  children,
  isPrimary,
  onClick,
}: {
  children: React.ReactNode;
  isPrimary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Button $isPrimary={isPrimary || false} onClick={onClick}>
      {children}
    </Button>
  );
}
