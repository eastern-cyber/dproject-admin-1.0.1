import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

export default function Component() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function mint(address to, uint256 tokenId, uint256 amount, string baseURI, bytes data) payable",
      params: [to, tokenId, amount, baseURI, data],
    });
    sendTransaction(transaction);
  };
}