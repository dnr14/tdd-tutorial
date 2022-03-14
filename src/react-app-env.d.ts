/// <reference types="react-scripts" />

declare namespace Props {
  type Button = {
    readonly label: string;
    readonly backgroundColor?: string;
    readonly hoverColor?: string;
    readonly onClick?: () => void;
  };
}

declare type ButtonFC = React.FC<Props.Button>;

export as namespace Props;
