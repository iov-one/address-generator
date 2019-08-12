import { Bip39, EnglishMnemonic, Random } from "@iov/crypto";
import copy from "clipboard-copy";
import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { makeAddress } from "./address";
import Header from "./Header";
import Jumbo from "./Jumbo";
import MnemonicInput from "./MnemonicInput";

interface AppProps {
  readonly network: "mainnet" | "testnet";
}

interface AppState {
  readonly words: readonly string[];
  readonly mnemonicVerificationErrorMessage: string | undefined;
  readonly address: string | undefined;
}

function wordCountOk(count: number): boolean {
  return count === 12 || count === 15 || count === 18 || count === 21 || count === 24;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emptyState: AppState = {
  words: [],
  mnemonicVerificationErrorMessage: undefined,
  address: undefined,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmedState: AppState = {
  words: [],
  mnemonicVerificationErrorMessage: undefined,
  address: "tiov12q9ngy4wl8tnl0px65e8f4zpcgspgcn05ncywj",
};

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = {
      ...emptyState,
    };
  }

  public render(): JSX.Element {
    return (
      <Container>
        <Header />
        <Jumbo network={this.props.network} />
        <Row>
          <Col>
            <h3>Enter your mnemonic:</h3>
            <p>
              We support English BIP39 mnemonics between 12 and 24 words. The mnemonic represents your private
              key. When you lose it, you cannot access that account anymore.
            </p>
            <div>
              <div className="d-flex justify-content-end">
                <button onClick={() => this.generateNewRandomMnemonic()} className="btn btn-link btn-sm">
                  Generate random
                </button>
                <button onClick={() => this.copyMnemonic()} className="btn btn-link btn-sm">
                  Copy
                </button>
                <button onClick={() => this.clearMnemonic()} className="btn btn-link btn-sm">
                  Clear
                </button>
              </div>
              <MnemonicInput
                ref="MnemonicInput1"
                id="input1"
                onWordsChanged={words => {
                  console.log(words);
                  this.setState({
                    words: words,
                    address: undefined,
                    mnemonicVerificationErrorMessage: undefined,
                  });
                }}
              />
              <div className="d-flex justify-content-between mt-2">
                <p>
                  <small>{this.state.words.length} words entered.</small>
                </p>
              </div>

              <Alert
                variant="danger"
                dismissible={true}
                role="alert"
                hidden={!this.state.mnemonicVerificationErrorMessage}
              >
                {this.state.mnemonicVerificationErrorMessage}
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => this.setState({ mnemonicVerificationErrorMessage: undefined })}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Alert>
            </div>
            <div className="d-flex justify-content-center mb-5">
              <Button
                disabled={!wordCountOk(this.state.words.length)}
                onClick={() => this.makeAddress()}
                className="btn-lg"
              >
                Show my {this.props.network} address
              </Button>
            </div>
          </Col>
        </Row>
        <Row hidden={!this.state.address}>
          <Col>
            <Alert variant="success">
              <Alert.Heading>Your IOV address:</Alert.Heading>
              <p className="leap">{this.state.address}</p>
            </Alert>
            <p>This browser tab contains sensitive information in memory. Please close it now.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  private async makeAddress(): Promise<void> {
    const answer = prompt("Did you store the mneonic in a secure location? Please answer with 'yes'.");
    if ((answer || "").trim().toLowerCase() !== "yes") {
      return;
    }

    try {
      const confirmed = new EnglishMnemonic(this.state.words.join(" "));

      this.setState({
        address: await makeAddress(confirmed, this.props.network),
      });
    } catch (error) {
      this.setState({
        mnemonicVerificationErrorMessage: error.toString(),
      });
    }
  }

  private copyMnemonic(): void {
    const mnemonic = this.state.words.join(" ");
    copy(mnemonic);
  }

  private async clearMnemonic(): Promise<void> {
    (this.refs.MnemonicInput1 as MnemonicInput).setWords([]);
  }

  private async generateNewRandomMnemonic(): Promise<void> {
    const randomWords = Bip39.encode(await Random.getBytes(16))
      .toString()
      .split(" ");

    (this.refs.MnemonicInput1 as MnemonicInput).setWords(randomWords);
  }
}

export default App;