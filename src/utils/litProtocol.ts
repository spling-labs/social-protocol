import { toString as uint8arrayToString } from 'uint8arrays';
import { PublicKey } from '@solana/web3.js';
import { sign } from 'tweetnacl';
import { LitAuthSig, LitClientConfiguration, LitNodeDecryptionParams, LitNodeSaveEncryptionParams, LitSolRpcCondition } from "index";

const CHAIN = 'solana';


export function getLitClientConfiguration(): LitClientConfiguration {
    const configLitClient: LitClientConfiguration = {
        alertWhenUnauthorized: false,
        minNodeCount: 6,
        debug: true
    }
    return configLitClient;
}

export function getLitAuthenticationSignatureForUserWallet(
    publicKey: PublicKey, secretKey: Uint8Array
    ): LitAuthSig {

    const MESSAGE_TO_SIGN = "Verify that you are owner of your key"
    const HEX_SIGNATURE_BASE = 'base16';

    try {

        const verifyMessageToSign = MESSAGE_TO_SIGN;
        const signature = sign.detached(Buffer.from(verifyMessageToSign), secretKey);

        const hexSignature = uint8arrayToString(signature, HEX_SIGNATURE_BASE);

        const authSig: LitAuthSig = {
            sig: hexSignature,
            derivedVia: "solana.signMessage",
            signedMessage: verifyMessageToSign,
            address: publicKey.toBase58()
        };

        console.log('Lit authSig ', authSig);

        return authSig;    
    } catch (error) {
        return error;
    }
    
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function getSolRpcCondition(publicKey: PublicKey): [LitSolRpcCondition] {
    let solRpcCondition: LitSolRpcCondition = {
            method: "",
            params: [":userAddress"],
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            pdaParams: [],
            pdaInterface: { offset: 0, fields: {} },
            pdaKey: "",
            chain: "solana",
            returnValueTest: {
                key: "",
                comparator: "=",
                value: publicKey.toBase58(),
            },
        }

    return [solRpcCondition];
}

export function createEncyptionsParams(solRpcConditions: [LitSolRpcCondition], symmetricKey: Uint8Array, authSig: LitAuthSig): LitNodeSaveEncryptionParams {
        
    const params: LitNodeSaveEncryptionParams = {
        accessControlConditions: solRpcConditions,
        symmetricKey: symmetricKey,
        authSig: authSig,
        chain: CHAIN
    }
    return params;
}

export function getAccessParams(solRpcConditions: [LitSolRpcCondition], symmetricKey: Uint8Array, authSig: LitAuthSig): LitNodeDecryptionParams  {
    
    const params: LitNodeDecryptionParams = {
        accessControlConditions: solRpcConditions,
        toDecrypt: symmetricKey,
        chain: CHAIN,
        authSig: authSig
    }
    return params;
}