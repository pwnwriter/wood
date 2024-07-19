{
  description = "pwnwriter.xyz";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... }: 
    let 
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      importShell = name: system: import ./nix/${name}.nix { inherit system nixpkgs; };
    in {
      devShells = builtins.listToAttrs (map (system: {
        name = system;
        value = {
          default = importShell "shell" system;
          lychee = importShell "lychee" system;
        };
      }) systems);
    };
}
