+++
title = "Installing NixOS on hetzner vps"
date = 2024-07-19
[taxonomies]
writings=["guides"]
+++


Will write 

```nix

{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
    in
    {
      devShells = builtins.listToAttrs (map
        (system: {
          name = system;
          value =
            let
              pkgs = import nixpkgs { inherit system; };
            in
            {
              default = pkgs.mkShell {
                packages = with pkgs; [
                        hello
                ];
                shellHook = ''
                  echo "hello?????"
                '';

              };
            };
        })
        systems);
    };
}

```
