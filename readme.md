# datapond-tracing-logs

## Setup

1. Install dfx using `DFX_VERSION=0.15.2 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"`
2. Add it to your PATH variables using `echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"`
3. Next, `run dfx start --background`
4. Then run `dfx deploy datapond_tracing_logs` to deploy the Canister. It will take a while
5. Then run `dfx canister call datapond_tracing_logs initializeCanister '(principal "<YOUR_PRINCIPLE_HERE>")'` to call the `initializeCanister` method to authorize back-end identity principle.
