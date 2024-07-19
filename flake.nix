{
  description = "pwnwriter.xyz";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = {  nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
    in
    {
      devShells = builtins.listToAttrs (map
        (system: {
          name = system;
          value = { default = import ./nix/shell.nix { inherit system nixpkgs; }; };
          value = { lychee = import ./nix/lychee.nix { inherit system nixpkgs; }; };
        })
        systems);
    };
}

