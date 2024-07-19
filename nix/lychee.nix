{ system, nixpkgs }:

let
  pkgs = import nixpkgs { inherit system; };
in
pkgs.mkShell {
  packages = with pkgs; [
    lychee
  ];
}
