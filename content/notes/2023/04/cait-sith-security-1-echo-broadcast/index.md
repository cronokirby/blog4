---
title: "Cait-Sith Security (1): Echo Broadcast"
date: 2023-02-27T14:03:26+01:00
type: note
note-tags:
  - "Cait-Sith"
  - "Cryptography"
  - "Protocols"
  - "TSS"
katex: true
---

One sub-component used a couple of times is a combined broadcast commitment
functionality, implemented via echo broadcast.

**Definition (Echo Broadcast Protocol):**
The broadcast protocol $\mathscr{P}[\text{EchoBroadcast}]$ is defined by the following;

$$
\boxed{
\begin{matrix}
\colorbox{FBCFE8}{\large
  $\mathscr{P}[\text{EchoBroadcast}]$
}\cr
\cr
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $P_i$
}\cr
\cr
&\underline{
  (1)\text{StartBroadcast}_i(x):
}\cr
  &\enspace
    \Rsh_i(\star, x, 0)
  \cr
\cr
&\underline{
  \text{WaitBroadcast}_i(x):
}\cr
  &\enspace
    \hat{x}\_\bullet \Lsh_i(\star, 0)
  \cr
  &\enspace
    \text{con}_i \gets \text{Hash}(\hat{x}\_\bullet)
  \cr
  &\enspace
    \Rsh_i(\star, \text{con}_i, 1)
  \cr
  &\enspace
    \texttt{return } x\_{\bullet}
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \hat{\text{con}}\_\bullet \Lsh_i(\star, 1)
  \cr
  &\enspace
    \texttt{if } \exists j.\enspace
    \hat{\text{con}}_j \neq \text{con}_i:
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\quad
\begin{matrix}
F[\text{SyncComm}]\cr
\otimes\cr
F[\text{Hash}]\cr
\end{matrix}\cr
\cr
\text{Leakage} := \\{\text{Hash}, \texttt{stop}\\}
\end{matrix}
}
$$

$\square$

**Definition (Ideal Broadcast Protocol):**

$$
\boxed{
\begin{matrix}
\colorbox{FBCFE8}{\large
  $\mathscr{P}[\text{IdealBroadcast}]$
}\cr
\cr
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $P_i$
}\cr
\cr
&\underline{
  (1)\text{StartBroadcast}_i(x):
}\cr
  &\enspace
    \text{SetBroadcast}_i(x)
  \cr
  &\enspace
    \text{SendBroadcast}_i(\star)
  \cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    x\_{\bullet} \gets \text{GetBroadcast}_i(\star)
  \cr
  &\enspace
    \text{Sync}_i(\star)
  \cr
  &\enspace
    \texttt{return } x\_{\bullet}
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \text{WaitSync}_i(\star)
  \cr
  &\enspace
    \texttt{if } \text{BadBroadcast}_i():
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\quad
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $F[\text{Broadcast}]$
}\cr
\cr
&x_i, \text{sent}\_{ij}, \text{trap}\_{ij} \gets \bot\cr
\cr
&\underline{
  (1)\text{SetBroadcast}_i(x):
}\cr
  &\enspace
    x_i \gets x
  \cr
\cr
&\underline{
  \text{SendBroadcast}_i(S):
}\cr
  &\enspace
    \texttt{assert } x_i \neq \bot
  \cr
  &\enspace
    \text{sent}\_{ij} \gets \texttt{true}\ (\forall j \in S)
  \cr
\cr
&\underline{
  \text{GetBroadcast}_i(S):
}\cr
  &\enspace
    \texttt{wait}\_{(i, 0)}\ \text{sent}\_{ji}\ (\forall j \in S)
  \cr
  &\enspace
    \texttt{return } [x_j \mid j \in S]
  \cr
\cr
&\underline{
  \textcolor{ef4444}{\text{Trap}(j, m\_\bullet)}:
}\cr
  &\enspace
    \texttt{assert } \forall i.\ m_i = \bot \lor (\text{trap}\_{i j} = \bot \land x_i = \bot)
  \cr
  &\enspace
    \text{trap}\_{i j} \gets m_i
  \cr
\cr
&\underline{
  \text{BadBroadcast}_i():
}\cr
  &\enspace
    \texttt{return } \exists j.\ \text{trap}\_{j i} \neq \bot \land \text{trap}\_{j i} \neq x\_j
  \cr
\end{aligned}
}
}\cr
\otimes\cr
F[\text{Sync}(1)]\cr
\otimes\cr
F[\text{Stop}]\cr
\end{matrix}\cr
\cr
\text{Leakage} := \\{\text{Trap}, \texttt{stop}\\}
\end{matrix}
}
$$

$\square$

**Lemma**
$\mathscr{P}[\text{EchoBroadcast}] \overset{\epsilon}{\leadsto} \mathscr{P}[\text{IdealBroadcast}]$,
for a negligible $\epsilon$, and any combination of malicious parties.

**Proof**

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^0_H$
}\cr
\cr
&\underline{
  (1)\text{StartBroadcast}_i(x):
}\cr
&\enspace
  \ldots
\cr
\end{aligned}
}
}
\otimes
\boxed{\colorbox{FBCFE8}{\large
  $\Gamma^0_M$
} = 1
\begin{pmatrix}
    \Rsh_k
  ,\cr
    \Lsh_k
  ,\cr
    \text{Hash}
\end{pmatrix}
}
\cr
  \circ
\cr
F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
$$

Next, send both hash and vector.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^1_H$
}\cr
&\ldots\cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    \hat{x}\_\bullet \Lsh_i(\star, 0)
  \cr
  &\enspace
    h_i \gets \text{Hash}(\hat{x}\_\bullet)
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \Rsh_i(\star, (h_i, \hat{x}\_\bullet), 1)
  $}
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
  \colorbox{bae6fd}{$
    (\hat{h}\_\bullet, \vec{x}\_\bullet) \Lsh_i(\star, 1)
  $}
  \cr
  &\enspace
    \texttt{if } \exists j.\enspace
    \hat{h}_j \neq h_i:
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{bae6fd}{\large
  $\Gamma^1_M$
}\cr
\cr
&\underline{
  \Rsh_k(S, h\_\bullet, 1):
}\cr
  &\enspace
    \Rsh_k(S, (h\_\bullet, \bot), 1)
  \cr
\cr
&\underline{
  \Lsh_k(S, 1):
}\cr
  &\enspace
    (\hat{h}\_\bullet, \ldots)\Lsh_k(S, 1)
  \cr
  &\enspace
    \texttt{return } [\hat{h}_j \mid j \in S]
  \cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  1(\Rsh_k, \Lsh_k, \text{Hash})
\end{matrix}
\cr
  \circ
\cr
F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
$$

Next, have honest parties omit hash.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^2_H$
}\cr
&\ldots\cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    \Rsh_i(\star, x, 0)
  \cr
  &\enspace
    \hat{x}\_\bullet \Lsh_i(\star, 0)
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \Rsh_i(\star, (\bot, \hat{x}\_\bullet), 1)
  $}
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    (\hat{h}\_\bullet, \vec{x}\_\bullet) \Lsh_i(\star, 1)
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{if } \exists j.\enspace
    \begin{matrix}
      (\hat{h}_j \neq \bot \land \hat{h}_j \neq \text{Hash}(\vec{x}_i))\ \lor\cr
      (\vec{x}_j \neq \bot \land \text{Hash}(\vec{x}_j) \neq \text{Hash}(\vec{x}_i))
    \end{matrix}
    :
  $}
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^2_M$
}\cr
\cr
&\underline{
  \Rsh_k(S, h\_\bullet, 1):
}\cr
  &\enspace
    \Rsh_k(S, (h\_\bullet, \bot), 1)
  \cr
\cr
&\colorbox{bae6fd}{$\underline{
  \Lsh_k(S, 1):
}$}\cr
  &\enspace
    (\hat{h}\_\bullet, \vec{x}\_\bullet)\Lsh_k(S, 1)
  \cr
  &\enspace
    \texttt{if } \hat{h}_j = \bot:
  \cr
  &\enspace\enspace
    \texttt{assert } \vec{x}_j \neq \bot
  \cr
  &\enspace\enspace
    \hat{h}_j \gets \text{Hash}(\vec{x}_j)
  \cr
  &\enspace
    \texttt{return } [\hat{h}_j \mid j \in S]
  \cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  1(\Rsh_k, \Lsh_k, \text{Hash})
\end{matrix}
\cr
  \circ
\cr
F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
$$

Now, except with negligible probability, we can use preimages instead.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^3_H$
}\cr
&\ldots\cr
\cr
&\colorbox{bae6fd}{$\underline{
  \text{WaitBroadcast}_i():
}$}\cr
  &\enspace
    \hat{x}\_\bullet \Lsh_i(\star, 0)
  \cr
  &\enspace
    \Rsh_i(\star, (\bot, \hat{x}\_\bullet), 1)
  \cr
\cr
&\colorbox{bae6fd}{$\underline{
  \text{EndBroadcast}_i():
}$}\cr
  &\enspace
    (\hat{h}\_\bullet, \vec{x}\_\bullet) \Lsh_i(\star, 1)
  \cr
  &\enspace
    \texttt{if } \exists j.\enspace
    \begin{matrix}
      (\hat{h}_j \neq \bot \land \hat{h}_j \neq \text{Hash}(\vec{x}_i))\ \lor\cr
      (\vec{x}_j \neq \bot \land \text{Hash}(\vec{x}_j) \neq \text{Hash}(\vec{x}_i))
    \end{matrix}
    :
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{bae6fd}{\large
  $\Gamma^3_M$
}\cr
\cr
&\mu[\ldots] \gets \bot\cr
&\underline{
  \text{Hash}(x\_\bullet):
}\cr
  &\enspace
    h \gets \text{Hash}(x\_\bullet)
  \cr
  &\enspace
    \mu[h] \gets x\_\bullet
  \cr
  &\enspace
    \texttt{return } h
  \cr
\cr
&h\_{ij} \gets \bot\cr
&\underline{
  \Rsh_k(S, h\_\bullet, 1):
}\cr
  &\enspace
    \texttt{assert } \forall j \in S.\ h_j \neq \bot
  \cr
  &\enspace
    \texttt{for } j \in S \cap \mathcal{M}:
  \cr
  &\enspace\enspace
    h\_{kj} \gets h_j
  \cr
  &\enspace
    \texttt{for } j \in S \cap \mathcal{H}:
  \cr
  &\enspace\enspace
    \texttt{if } \mu[h_j] \neq \bot:
  \cr
  &\enspace\enspace\enspace
    \Rsh_k(\\{j\\}, (\bot, \mu[h_j]), 1)
  \cr
  &\enspace\enspace
    \texttt{else}:
  \cr
  &\enspace\enspace\enspace
    \Rsh_k(\\{j\\}, (h_j, \bot), 1)
  \cr
  &
\cr
&\underline{
  \Lsh_k(S, 1):
}\cr
  &\enspace
    (\ldots, \vec{x}\_\bullet)\Lsh_k(S \cap \mathcal{H}, 1)
  \cr
  &\enspace
    \texttt{wait}\_{(k, 1)}\ \forall j \in S \cap \mathcal{M}.\ h\_{jk} \neq \bot
  \cr
  &\enspace
    \texttt{return }\begin{bmatrix}
      \text{Hash}(\vec{x}\_j) &\mid& j \in S \cap \mathcal{H}\cr
      h\_{jk} &\mid& j \in S \cap \mathcal{M}\cr
    \end{bmatrix}
  \cr
\cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  1(\Rsh_k, \Lsh_k, \text{Hash})
\end{matrix}
\cr
  \circ
\cr
F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
$$

Now, except with negligible probability, a hash with no pre-image
will fail, so remove sending hashes.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^4_H$
}\cr
&\ldots\cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    \hat{x}\_\bullet \Lsh_i(\star, 0)
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \Rsh_i(\star, \hat{x}\_\bullet, 1)
  $}
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
  \colorbox{bae6fd}{$
    \vec{x}\_\bullet \Lsh_i(\star, 1)
  $}
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{if } \exists j.\enspace
      \text{Hash}(\vec{x}_j) \neq \text{Hash}(\vec{x}_i)
    :
  $}
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^4_M$
}\cr
\cr
&\ldots\cr
\cr
&\underline{
  \Rsh_k(S, h\_\bullet, 1):
}\cr
  &\enspace
    \ldots
  \cr
  &\enspace
    \texttt{for } j \in S \cap \mathcal{H}:
  \cr
  &\enspace\enspace
    \texttt{if } \mu[h_j] \neq \bot:
  \cr
  &\enspace\enspace\enspace
  \colorbox{bae6fd}{$
    \Rsh_k(\\{j\\}, \mu[h_j], 1)
  $}
  \cr
  &\enspace\enspace
    \texttt{else}:
  \cr
  &\enspace\enspace\enspace
  \colorbox{bae6fd}{$
    \texttt{stop}(\star, 1)
  $}
  \cr
  &
\cr
&\underline{
  \Lsh_k(S, 1):
}\cr
  &\enspace
  \colorbox{bae6fd}{$
    \vec{x}\_\bullet\Lsh_k(S \cap \mathcal{H}, 1)
  $}
  \cr
  &\enspace
    \ldots
  \cr
\cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  1(\Rsh_k, \Lsh_k, \text{Hash})
\end{matrix}
\cr
  \circ
\cr
F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
$$

Now, unroll again.
$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^5_H$
}\cr
&\ldots\cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    \Rsh_i(\star, x, 0)
  \cr
  &\enspace
    \hat{x}\_\bullet \Lsh_i(\star, 0)
  \cr
  &\enspace
    \Rsh_i(\star, \hat{x}\_\bullet, 1)
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \vec{x}\_\bullet \Lsh_i(\star, 1)
  \cr
  &\enspace
    \texttt{if } \exists j.\enspace
      \text{Hash}(\vec{x}_j) \neq \text{Hash}(\vec{x}_i)
    :
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\boxed{\colorbox{FBCFE8}{\large
  $\Gamma^5_M$
} = 1
\begin{pmatrix}
    \Rsh_k
  ,\cr
    \Lsh_k
  ,\cr
    \text{Hash}
\end{pmatrix}
}
\cr
  \circ
\cr
F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
$$

Except with negligible probability, the hashes won't collide.
$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^6_H$
}\cr
&\ldots\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \ldots
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{if } \exists j.\enspace
      \vec{x}_j \neq \vec{x}_i
    :
  $}
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\boxed{\colorbox{FBCFE8}{\large
  $\Gamma^6_M$
} = \Gamma^5_M}
\cr
  \circ
\cr
F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
$$

Now, get rid of communication.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{bae6fd}{\large
  $\Gamma^7_H$
}\cr
\cr
&\underline{
  (1)\text{StartBroadcast}_i(x):
}\cr
  &\enspace
    \hat{x}\_{ij} \gets x
  \cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    \texttt{wait}\_{(i, 0)}\ \forall j.\ \hat{x}\_{ji} \neq \bot
  \cr
  &\enspace
    \vec{x}\_{ij} \gets \hat{x}\_{\bullet i}
  \cr
  &\enspace
    \text{sync}\_{ij} \gets \texttt{true}
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \texttt{wait}\_{(i, 1)}\ \forall j.\ \text{sync}\_{ji} \neq \bot
  \cr
  &\enspace
    \texttt{if } \exists j.\enspace
      \vec{x}\_{ji} \neq \hat{x}\_{\bullet i}
    :
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{bae6fd}{\large
  $\Gamma^7_M$
}\cr
\cr
&\underline{
  \Rsh_k(S, m\_\bullet, 0):
}\cr
  &\enspace
    \texttt{assert } \forall j \in S.\ m_j \neq \bot \land \hat{x}\_{kj} = \bot
  \cr
  &\enspace
    \hat{x}\_{kj} \gets m_j\ (\forall j \in S)
  \cr
\cr
&\underline{
  \Rsh_k(S, m\_\bullet, 1):
}\cr
  &\enspace
    \texttt{assert } \forall j \in S.\ m_j \neq \bot \land \vec{x}\_{kj} = \bot
  \cr
  &\enspace
    \vec{x}\_{kj} \gets m_j\ (\forall j \in S)
  \cr
  &\enspace
    \text{sync}\_{kj} \gets \texttt{true}\ (\forall j \in S)
  \cr
\cr
&\underline{
  \Lsh_k(S, 0):
}\cr
  &\enspace
    \texttt{wait}\_{(k, 0)}\ \forall j \in S.\ \hat{x}\_{jk} \neq \bot
  \cr
  &\enspace
    \texttt{return } [\hat{x}\_{j k} \mid j \in S]
  \cr
\cr
&\underline{
  \Lsh_k(S, 1):
}\cr
  &\enspace
    \texttt{wait}\_{(k, 1)}\ \forall j \in S.\ \text{sync}\_{jk} \neq \bot
  \cr
  &\enspace
    \texttt{return } [\vec{x}\_{jk} \mid j \in S]
  \cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
\cr
  \circ
\cr
\boxed{
\small{
\begin{aligned}
\texttt{pub } \hat{x}\_{ij}, \vec{x}\_{ij}, \text{sync}\_{ij} \gets \bot
\end{aligned}
}
}
\otimes
F[\text{Stop}]
\end{matrix}
$$

Next, we can split the check into an honest check, and a malicious check.
$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^8_H$
}\cr
&\ldots\cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \ldots
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{if } \exists j \in \mathcal{H}.\enspace
      \hat{x}\_{\bullet j} \neq \hat{x}\_{\bullet i}
    :
  $}
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{if } \exists j \in \mathcal{M}.\enspace
      \vec{x}\_{ji} \neq \hat{x}\_{\bullet i}
    :
  $}
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^8_M$
} = \Gamma^7_M\cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
\cr
  \circ
\cr
\boxed{
\small{
\begin{aligned}
\texttt{pub } \hat{x}\_{ij}, \vec{x}\_{ij}, \text{sync}\_{ij} \gets \bot
\end{aligned}
}
}
\otimes
F[\text{Stop}]
\end{matrix}
$$

The honest check only fails because of equivocation, and we can
detect that in $\Gamma_M$.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^9_H$
}\cr
\cr
&\underline{
  (1)\text{StartBroadcast}_i(x):
}\cr
  &\enspace
    \hat{x}\_{ij} \gets x
  \cr
  &\enspace
    \text{sent}\_{ij} \gets \texttt{true}
  \cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    \texttt{wait}\_{(i, 0)}\ \forall j.\ \hat{x}\_{ij} \neq \bot
  \cr
  &\enspace
    \vec{x}\_{ij} \gets \hat{x}\_{\bullet i}
  \cr
  &\enspace
    \text{sync}\_{ij} \gets \texttt{true}
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \texttt{wait}\_{(i, 1)}\ \forall j.\ \text{sync}\_{ji} \neq \bot
  \cr
  &\enspace
    \texttt{if } \exists j \in \mathcal{M}.\enspace
      \vec{x}\_{ji} \neq \hat{x}\_{\bullet i}
    :
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^9_M$
}\cr
\cr
&\colorbox{bae6fd}{$
  x_k \gets \bot
$}\cr
&\underline{
  \Rsh_k(S, m\_\bullet, 0):
}\cr
  &\enspace
    \texttt{assert } \forall j \in S.\ m_j \neq \bot \land \hat{x}\_{kj} = \bot
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{for } j \in S \cap \mathcal{H}:
  $}
  \cr
  &\enspace\enspace
  \colorbox{bae6fd}{$
    \texttt{if } x_k = \bot:\enspace x_k \gets m_j
  $}
  \cr
  &\enspace\enspace
  \colorbox{bae6fd}{$
    \texttt{elif } x_k \neq m_j:\enspace \texttt{stop}(\\{j\\}, 1)
  $}
  \cr
  &\enspace
    \hat{x}\_{kj} \gets m_j\ (\forall j \in S)
  \cr
\cr
&
\ldots
\cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
\cr
  \circ
\cr
\boxed{
\small{
\begin{aligned}
\texttt{pub } \hat{x}\_{ij}, \vec{x}\_{ij}, \text{sent}\_{ij}, \text{sync}\_{ij} \gets \bot
\end{aligned}
}
}
\otimes
F[\text{Stop}]
\end{matrix}
$$

Now, the only thing that can cause a malicious failure is if
a bad $\vec{x}\_{ij}$ value is set.
We can capture this with a trap value.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^{10}_H$
}\cr
\cr
&\underline{
  (1)\text{Broadcast}_i(x):
}\cr
  &\enspace
    \hat{x}\_{ij} \gets x
  \cr
  &\enspace
    \text{sent}\_{ij} \gets \texttt{true}
  \cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    \texttt{wait}\_{(i, 0)}\ \forall j.\ \hat{x}\_{ij} \neq \bot
  \cr
  &\enspace
    \vec{x}\_{ij} \gets \hat{x}\_{\bullet i}
  \cr
  &\enspace
    \text{sync}\_{ij} \gets \texttt{true}
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \texttt{wait}\_{(i, 1)}\ \forall j.\ \text{sync}\_{ji} \neq \bot
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{if }
      \text{trap}\_{\bullet i} \neq \bot \land
      \text{trap}\_{\bullet i} \neq \hat{x}\_{\bullet i}
    :
  $}
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^{10}_M$
}\cr
\cr
&\ldots\cr
\cr
&\underline{
  \Rsh_k(S, m\_\bullet, 1):
}\cr
  &\enspace
    \texttt{assert } \forall j \in S.\ m_j \neq \bot \land \vec{x}\_{kj} = \bot
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{for } j \in S \cap \mathcal{H}:
  $}
  \cr
  &\enspace\enspace
  \colorbox{bae6fd}{$
    \texttt{if } \text{trap}\_{\bullet j} = \bot:\enspace \text{trap}\_{\bullet j} \gets m_j
  $}
  \cr
  &\enspace\enspace
  \colorbox{bae6fd}{$
    \texttt{elif } \text{trap}\_{\bullet j} \neq m_j:\enspace \texttt{stop}(\\{j\\}, 1)
  $}
  \cr
  &\enspace
    \vec{x}\_{kj} \gets m_j\ (\forall j \in S)
  \cr
  &\enspace
    \text{sync}\_{kj} \gets \texttt{true}\ (\forall j \in S)
  \cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
\cr
  \circ
\cr
\boxed{
\small{
\begin{aligned}
\texttt{pub } \hat{x}\_{ij}, \text{trap}\_{ij}, \vec{x}\_{ij}, \text{sent}\_{ij}, \text{sync}\_{ij} \gets \bot
\end{aligned}
}
}
\otimes
F[\text{Stop}]
\end{matrix}
$$

Since we can't equivocate, simplify variables.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{bae6fd}{\large
  $\Gamma^{11}_H$
}\cr
\cr
&\underline{
  (1)\text{Broadcast}_i(x):
}\cr
  &\enspace
    \text{SetBroadcast}_i(x)
  \cr
  &\enspace
    \text{SendBroadcast}_i(\star)
  \cr
\cr
&\underline{
  \text{WaitBroadcast}_i():
}\cr
  &\enspace
    x\_{\bullet} \gets \text{GetBroadcast}_i(\star)
  \cr
  &\enspace
    \text{Sync}_i(\star)
  \cr
\cr
&\underline{
  \text{EndBroadcast}_i():
}\cr
  &\enspace
    \text{WaitSync}_i(\star)
  \cr
  &\enspace
    \texttt{if } \text{BadBroadcast}_i():
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 1)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^{11}_M$
}\cr
\cr
&\colorbox{bae6fd}{$
x_k, \hat{x}\_{ij}, \vec{x}\_{ij} \gets \bot
$}\cr
&\underline{
  \Rsh_k(S, m\_\bullet, 0):
}\cr
  &\enspace
    \texttt{assert } \forall j \in S.\ m_j \neq \bot \land \hat{x}\_{kj} = \bot
  \cr
  &\enspace
    \texttt{for } j \in S \cap \mathcal{H}:
  \cr
  &\enspace\enspace
    \texttt{if } x_k = \bot:
  \cr
  &\enspace\enspace\enspace
    x_k \gets m_j
  \cr
  &\enspace\enspace\enspace
  \colorbox{bae6fd}{$
    \text{SetBroadcast}_k(x_k)
  $}
  \cr
  &\enspace\enspace
    \texttt{elif } x_k \neq m_j:\enspace \texttt{stop}(\\{j\\}, 1)
  \cr
  &\enspace
    \hat{x}\_{kj} \gets m_j\ (\forall j \in S \cap \mathcal{M})
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \text{SendBroadcast}_k(S \cap \mathcal{H})
  $}
  \cr
\cr
&\underline{
  \Rsh_k(S, m\_\bullet, 1):
}\cr
  &\enspace
    \texttt{assert } \forall j \in S.\ m_j \neq \bot \land \vec{x}\_{kj} = \bot
  \cr
  &\enspace
    \texttt{for } j \in S \cap \mathcal{H}:
  \cr
  &\enspace\enspace
    \texttt{if } \text{trap}\_{\bullet j} = \bot:
  \cr
  &\enspace\enspace\enspace
  \colorbox{bae6fd}{$
    \text{Trap}(j, m_j)
  $}
  \cr
  &\enspace\enspace
    \texttt{elif } \text{trap}\_{\bullet j} \neq m_j:\enspace \texttt{stop}(\\{j\\}, 1)
  \cr
  &\enspace
    \vec{x}\_{kj} \gets m_j\ (\forall j \in S)
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \text{Sync}_k(S)
  $}
  \cr
\cr
&\underline{
  \Lsh_k(S, 0):
}\cr
  &\enspace
    \texttt{wait}\_{(k, 0)}\ \forall j \in S \cap M.\ \hat{x}\_{jk} \neq \bot
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \hat{x}\_{jk} \gets \text{GetBroadcast}_k(\\{j\\})\ (\forall j \in S \cap \mathcal{H})
  $}
  \cr
  &\enspace
    \texttt{return } [\hat{x}\_{j k} \mid j \in S]
  \cr
\cr
&\underline{
  \Lsh_k(S, 1):
}\cr
  &\enspace
  \colorbox{bae6fd}{$
    \text{WaitSync}_k()
  $}
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \vec{x}\_{jk} \gets \text{GetBroadcast}_k(\star)\ (\forall j \in S \cap \mathcal{H})
  $}
  \cr
  &\enspace
    \texttt{return } [\vec{x}\_{jk} \mid j \in S]
  \cr
\end{aligned}
}
}
\cr
  \otimes
\cr
  F[\text{SyncComm}] \otimes F[\text{Hash}]
\end{matrix}
\cr
  \circ
\cr
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $F[\text{Broadcast}]'$
}\cr
\cr
&x_i, \text{sent}\_{ij}, \text{trap}\_{ij} \gets \bot\cr
\cr
&\underline{
  (1)\text{SetBroadcast}_i(x):
}\cr
  &\enspace
    x_i \gets x
  \cr
\cr
&\underline{
  \text{GetBroadcast}_i(S):
}\cr
  &\enspace
    \texttt{wait}\_{(i, 0)}\ \text{sent}\_{ji}\ (\forall j \in S)
  \cr
  &\enspace
    \texttt{return } [x_j \mid j \in S]
  \cr
\cr
&\underline{
  \text{Trap}(j, m\_\bullet):
}\cr
  &\enspace
    \texttt{assert } \text{trap}\_{\bullet j} = \bot
  \cr
  &\enspace
    \text{trap}\_{i j} \gets m_i
  \cr
\cr
&\underline{
  \text{BadBroadcast}(j, m\_\bullet):
}\cr
  &\enspace
    \texttt{return } \exists i.\ \text{trap}\_{i j} \neq \bot \land \text{trap}\_{i j} \neq x\_i
  \cr
\end{aligned}
}
}
\otimes
F[\text{Sync}(1)]
\otimes
F[\text{Stop}]
\end{matrix}
$$

Next, unroll again.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^{12}_H$
}\cr
\cr
&\underline{
  (1)\text{StartBroadcast}_i(x):
}\cr
&\enspace
  \ldots
\cr
\end{aligned}
}
}
\otimes
\boxed{\colorbox{FBCFE8}{\large
  $\Gamma^{12}_M$
} = 1
\begin{pmatrix}
    \text{SetBroadcast}_k
  ,\cr
    \text{GetBroadcast}_k
  ,\cr
    \text{BadBroadcast}_k
  ,\cr
    \text{Sync}_k
  ,\cr
    \text{Trap}
\end{pmatrix}
}
\cr
  \circ
\cr
F[\text{Broadcast}]' \otimes F[\text{Sync}(1)] \otimes F[\text{Stop}]
\end{matrix}
$$

Then, amend things so that trap only runs before values have been broadcast.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^{13}_H$
} = \Gamma^{12}_H\cr
\end{aligned}
}
}
\otimes
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^{13}_M$
}\cr
\cr
&\colorbox{bae6fd}{$
\underline{
  \text{Trap}(j, m\_{\bullet}):
}$}\cr
  &\enspace
    \texttt{for } i \in \mathcal{H}:
  \cr
  &\enspace\enspace
    \texttt{if } \exists k.\ x \gets \texttt{nowait } \text{GetBroadcast}_k(\\{i\\}):
  \cr
  &\enspace\enspace\enspace
    \texttt{if } m_i \neq x:
  \cr
  &\enspace\enspace\enspace\enspace
    \texttt{stop}(\\{j\\}, 1)
  \cr
  &\enspace\enspace\enspace\enspace
    \texttt{return}
  \cr
  &\enspace
    \text{Trap}(j, m\_\bullet)
  \cr
\end{aligned}
}
}
\cr
  \circ
\cr
F[\text{Broadcast}] \otimes F[\text{Sync}(1)] \otimes F[\text{Stop}]
\end{matrix}
$$

concluding our proof.

$\blacksquare$

**Definition (Commitment Protocol):**

$$
\boxed{
\begin{matrix}
\colorbox{FBCFE8}{\large
  $\mathscr{P}[\text{Commit}]$
}\cr
\cr
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $P_i$
}\cr
\cr
&x_i, r_i \gets \bot\cr
\cr
&\underline{
  (1)\text{SetCommit}_i(x):
}\cr
  &\enspace
    x_i \gets x, \quad r_i \xleftarrow{\\$} \texttt{01}^{2 \lambda}
  \cr
  &\enspace
    \text{SetBroadcast}_i(\text{Hash}(x_i, r_i))
  \cr
\cr
&\underline{
  \text{Commit}_i():
}\cr
  &\enspace
    \text{SendBroadcast}_i(\star)
  \cr
\cr
&\underline{
  \text{WaitCommit}_i():
}\cr
  &\enspace
    \texttt{return } \text{WaitBroadcast}_i()
  \cr
\cr
&\underline{
  \text{Open}_i():
}\cr
  &\enspace
    \texttt{assert } x_i \neq \bot
  \cr
  &\enspace
    \Rsh_i(\star, (x_i, r_i), 2)
  \cr
\cr
&\underline{
  \text{WaitOpen}_i():
}\cr
  &\enspace
    c\_\bullet \gets \text{WaitCommit}_i()
  \cr
  &\enspace
    \text{EndBroadcast}_i()
  \cr
  &\enspace
    (\hat{x}\_{\bullet}, \hat{r}\_{\bullet}) \Lsh_i(\star, 2)
  \cr
  &\enspace
    \texttt{if } \exists j.\ \text{Hash}(\hat{x}_j, \hat{r}_j) \neq c_j:
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 2)
  \cr
  &\enspace
    \texttt{return } \hat{x}\_{\bullet}
  \cr
\cr
\end{aligned}
}
}
\quad
\begin{matrix}
F[\text{Stop}]\cr
\circledcirc\cr
F[\text{SyncComm}]\cr
\otimes\cr
F[\text{Hash}]\cr
\end{matrix}\cr
\cr
\text{Leakage} := \\{\text{Hash}, \texttt{stop}\\}
\end{matrix}
}
$$

$\square$

**Definition (Ideal Commitment):**
$$
\boxed{
\begin{matrix}
\colorbox{FBCFE8}{\large
  $\mathscr{P}[\text{IdealCommit}]$
}\cr
\cr
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $P_i$
}\cr
\cr
&\underline{
  (1)\text{SetCommit}_i(x):
}\cr
  &\enspace
    \text{SetCommit}_i(x)
  \cr
\cr
&\underline{
  \text{Commit}_i():
}\cr
  &\enspace
    \text{Commit}_i(\star)
  \cr
\cr
&\underline{
  \text{WaitCommit}_i():
}\cr
  &\enspace
    \text{WaitCommit}_i(\star)
  \cr
  &\enspace
    \text{Sync}_i(\star)
  \cr
\cr
&\underline{
  \text{Open}_i():
}\cr
  &\enspace
    \text{Open}_i(\star)
  \cr
\cr
&\underline{
  \text{WaitOpen}_i():
}\cr
  &\enspace
    \text{WaitCommit}_i()
  \cr
  &\enspace
    \text{WaitSync}_i(\star)
  \cr
  &\enspace
    \texttt{return } \text{WaitOpen}_i(\star)
  \cr
\end{aligned}
}
}
\quad
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $F[\text{Commit}]$
}\cr
\cr
&x_i, \text{com}\_{ij}, \text{open}\_{ij} \gets \bot\cr
\cr
&\underline{
  (1)\text{SetCommit}_i(x):
}\cr
  &\enspace
    x_i \gets x
  \cr
\cr
&\underline{
  \text{Commit}_i(S):
}\cr
  &\enspace
    \text{com}\_{ij} \gets \texttt{true}\ (\forall j \in S)
  \cr
\cr
&\underline{
  \text{WaitCommit}_i(S):
}\cr
  &\enspace
    \texttt{wait}\_{(i, 0)} \forall j \in S.\ \text{com}\_{ji}
  \cr
\cr
&\underline{
  \text{Open}_i(S):
}\cr
  &\enspace
    \texttt{assert } x_i \neq \bot
  \cr
  &\enspace
    \text{open}\_{ij} \gets \texttt{true} (\forall j \in S)
  \cr
\cr
&\underline{
  \text{WaitOpen}_i(S):
}\cr
  &\enspace
    \text{wait}\_{(i, 2)} \forall j \in S.\ \text{open}\_{ji}
  \cr
  &\enspace
    \texttt{return } x\_\bullet
  \cr
\end{aligned}
}
}\cr
\otimes\cr
F[\text{Sync}(1)]\cr
\circledcirc\cr
F[\text{Stop}]
\end{matrix}\cr
\cr
\text{Leakage} := \\{\text{Hash}, \texttt{stop}\\}
\end{matrix}
}
$$

**Lemma**
$$
\begin{matrix}
\mathscr{P}[\text{Commit}] \lhd \mathscr{P}[\text{IdealBroadcast}]
\overset{\epsilon}{\leadsto}
\mathscr{P}[\text{IdealCommit}]
\end{matrix}
$$
for some negligible $\epsilon$.

**Proof:**

First, unroll to get:

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^0_H$
}\cr
\cr
&\underline{
  (1)\text{SetCommit}_i(x):
}\cr
&\enspace
  \ldots
\cr
\end{aligned}
}
}
\otimes
\boxed{\colorbox{FBCFE8}{\large
  $\Gamma^0_M$
} = 1
\begin{pmatrix}
    \text{SetBroadcast}_k
  ,\cr
    \text{SendBroadcast}_k
  ,\cr
    \text{GetBroadcast}_k
  ,\cr
    \text{BadBroadcast}_k
  ,\cr
    \text{Trap}
  ,\cr
    \text{Sync}_k
  ,\cr
    \text{WaitSync}_k
  ,\cr
    \Rsh_k
  ,\cr
    \Lsh_k
  ,\cr
    \text{Hash}
  ,\cr
    \texttt{stop}
\end{pmatrix}
}
\cr
  \circ
\cr
F[\text{Broadcast}] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

Now, a trap value needs to be provided before the commitment
value is known.
However, for honest parties, these commitment values
are in all likelihood freshly sampled, because of the entropy
in $r$.
This means that trapping honest values is useless,
since except with negligible probability, it has no effect.

$$
\begin{matrix}
\boxed{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^1_H$
} = \Gamma^0_H
\end{aligned}
}
\otimes
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^1_M$
}\cr
&\ldots\cr
&\colorbox{bae6fd}{$
\underline{
  \text{Trap}(j, m\_\bullet):
}$}\cr
  &\enspace
    \text{com}_i \gets x_i \neq \bot (\forall i \in \mathcal{M})
  \cr
  &\enspace
    \text{com}_i \gets \texttt{nowait } \text{GetBroadcast}_k(\\{i\\})\neq \bot (\forall i \in \mathcal{H})
  \cr
  &\enspace
    \texttt{assert } \forall i.\ m_i = \bot \lor (\text{trap}\_{i j} = \bot \land \neg \text{com}_i)
  \cr
  &\enspace
    \forall i \in \mathcal{H}.\ m_i \gets \bot
  \cr
  &\enspace
    \text{Trap}(j, m\_{\bullet})
  \cr
\end{aligned}
}
}
\cr
  \circ
\cr
F[\text{Broadcast}] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

We can now replace $F[\text{Broadcast}]$ with
a function $F[\text{Broadcast}']$, in which trapping isn't
possible, because we can simulate the effects ourself.

$$
\begin{matrix}
\boxed{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^2_H$
} = \Gamma^1_H
\end{aligned}
}
\otimes
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^2_M$
}\cr
&\ldots\cr
&\colorbox{bae6fd}{$
c_k, \text{trap}\_{ij}, \text{bad}_k \gets \bot$}
\cr
\cr
&\underline{
  \text{Trap}(j, m\_\bullet):
}\cr
  &\enspace
    \text{com}_i \gets c_i \neq \bot (\forall i \in \mathcal{M})
  \cr
  &\enspace
    \text{com}_i \gets \texttt{nowait } \text{GetBroadcast}_k(\\{i\\})\neq \bot (\forall i \in \mathcal{H})
  \cr
  &\enspace
    \texttt{assert } \forall i.\ m_i = \bot \lor (\text{trap}\_{i j} = \bot \land \neg \text{com}_i)
  \cr
  &\enspace
    \forall i \in \mathcal{H}.\ m_i \gets \bot
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \text{trap}\_{ij} \gets m_i
  $}
  \cr
\cr
&\colorbox{bae6fd}{$
\underline{
  \text{SetBroadcast}_k(c):
}$}\cr
  &\enspace
    c_k \gets c
  \cr
  &\enspace
    \texttt{if } \exists j.\ \text{trap}\_{jk} \neq \bot \land \text{trap}\_{jk} \neq c:
  \cr
  &\enspace\enspace
    \text{bad}_j \gets \texttt{true}
  \cr
  &\enspace\enspace
    \texttt{if } j \in \mathcal{H}:\ \texttt{stop}(\\{j\\}, 1)
  \cr
\cr
&\colorbox{bae6fd}{$
\underline{
  \text{BadBroadcast}_k():
}$}\cr
  &\enspace
    \texttt{return } \text{bad}_k
  \cr
\end{aligned}
}
}
\cr
  \circ
\cr
F[\text{Broadcast}'] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

From this we see that we're in fact simulating a protocol
which is like $\mathscr{P}[\text{EchoBroadcast}]$,
except that trapping is not possible.
Let's unroll that protocol, to get:

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^3_H$
}\cr
\cr
&\underline{
  (1)\text{SetCommit}_i(x):
}\cr
&\enspace
  \ldots
\cr
\end{aligned}
}
}
\otimes
\boxed{\colorbox{FBCFE8}{\large
  $\Gamma^3_M$
} = 1
\begin{pmatrix}
    \text{SetBroadcast}_k
  ,\cr
    \text{SendBroadcast}_k
  ,\cr
    \text{GetBroadcast}_k
  ,\cr
  ,\cr
    \text{Sync}_k
  ,\cr
    \text{WaitSync}_k
  ,\cr
    \Rsh_k
  ,\cr
    \Lsh_k
  ,\cr
    \text{Hash}
  ,\cr
    \texttt{stop}
\end{pmatrix}
}
\cr
  \circ
\cr
F[\text{Broadcast}'] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

At the end of $\text{WaitOpen}_i$, we check that the opened
values match the commitments.
Because honest parties will always open the right values,
we can instead limit the check to malicious parties.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^4_H$
}\cr
\cr
&\underline{
  \text{WaitOpen}_i(x):
}\cr
  &\enspace
    c\_\bullet \gets \text{WaitCommit}_i()
  \cr
  &\enspace
    \text{EndBroadcast}_i()
  \cr
  &\enspace
    (\hat{x}\_{\bullet}, \hat{r}\_{\bullet}) \Lsh_i(\star, 2)
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{if } \exists j \in \mathcal{M}.\ \text{Hash}(\hat{x}_j, \hat{r}_j) \neq c_j:
  $}
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 2)
  \cr
  &\enspace
    \texttt{return } \hat{x}\_{\bullet}
  \cr
\end{aligned}
}
}
\otimes
\boxed{\colorbox{FBCFE8}{\large
  $\Gamma^4_M$
} = \Gamma^3_M
}
\cr
  \circ
\cr
F[\text{Broadcast}'] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

Now, because of the entropy of the $r$ values, in all likelihood
the random oracle will not have been queried
at that value before, and so we can instead assume that the value
is random, and then backfill it later.
Thus, we have honest parties broadcast completely random commitments,
and then program the random oracle after they open the commitment.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^5_H$
}\cr
\cr
&\colorbox{bae6fd}{$
x_i, c_i \gets \bot
$}\cr
&\ldots\cr
\cr
&\colorbox{bae6fd}{$
\underline{
  (1)\text{SetCommit}_i(x):
}$}\cr
  &\enspace
    x_i \gets x
  \cr
  &\enspace
    c_i \xleftarrow{\\$} \texttt{01}^{2 \lambda}
  \cr
  &\enspace
    \text{SetBroadcast}_i(c_i)
  \cr
\cr
&\underline{
  \text{Open}_i():
}\cr
  &\enspace
    \texttt{assert } x_i \neq \bot
  \cr
  &\enspace
  \colorbox{bae6fd}{$
    r_i \xleftarrow{\\$} \texttt{01}^{2\lambda}
  $}
  \cr
  &\enspace
    \Rsh_i(\star, (x_i, r_i), 2)
  \cr
\cr
&\underline{
  \text{WaitOpen}_i(x):
}\cr
  &\enspace
    c\_\bullet \gets \text{WaitCommit}_i()
  \cr
  &\enspace
    \text{EndBroadcast}_i()
  \cr
  &\enspace
    (\hat{x}\_{\bullet}, \hat{r}\_{\bullet}) \Lsh_i(\star, 2)
  \cr
  &\enspace
    \texttt{if } \exists j \in \mathcal{M}.\ \text{Hash}(\hat{x}_j, \hat{r}_j) \neq c_j:
  \cr
  &\enspace\enspace
    \texttt{stop}(\star, 2)
  \cr
  &\enspace
    \texttt{return } \hat{x}\_{\bullet}
  \cr
\end{aligned}
}
}
\otimes
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^5_H$
}\cr
&\ldots\cr
\cr
&\colorbox{bae6fd}{$
\underline{
  \text{Hash}(x, r):
}$}\cr
  &\enspace
    \texttt{if } \exists k \in \mathcal{M}, j \in \mathcal{H}.\ \texttt{nowait}\Lsh_k(\\{j\\}, 2) = (x, r):
  \cr
  &\enspace\enspace
    \texttt{if } \exists k \in \mathcal{M}, j \in \mathcal{H}.\ \texttt{nowait } \text{GetBroadcast}(\\{j\\}) \to c_j:
  \cr
  &\enspace\enspace\enspace
    \texttt{return } c_j
  \cr
  &\enspace
    \texttt{return } \text{Hash}(x, r)
  \cr
\end{aligned}
}
}
\cr
  \circ
\cr
F[\text{Broadcast}'] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

Next, except with negligible probability we can extract preimages
of commitments, since a commitment that hasn't come from the hash
function will fail with probability $\leq 2^{-2\lambda}$.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^6_H$
} = \Gamma^5_H\cr
\end{aligned}
}
}
\otimes
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^6_H$
}\cr
&\mu[\bullet], x_k, r_k \gets \bot\cr
&\ldots\cr
\cr
&\colorbox{bae6fd}{$
\underline{
  \text{SetBroadcast}_k(h):
}$}\cr
  &\enspace
    \texttt{assert } h \in \mu
  \cr
  &\enspace
    (x_k, r_k) \gets \mu[h]
  \cr
  &\enspace
    \text{SetBroadcast}_k(h)
  \cr
\cr
&\colorbox{bae6fd}{$
\underline{
  \text{Hash}(x, r):
}$}\cr
  &\enspace
    h \gets \text{Hash}'(x, r)
  \cr
  &\enspace
    \mu[h] \gets (x, r)
  \cr
  &\enspace
    \texttt{return } h
  \cr
&\underline{
  \text{Hash}'(x, r):
}\cr
  &\enspace
    \ldots
  \cr
\end{aligned}
}
}
\cr
  \circ
\cr
F[\text{Broadcast}'] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

Next, instead of checking for bad openings inside honest parties,
when can instead have malicious parties directly cause
a stop once they send a bad value.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^7_H$
}\cr
&\ldots\cr
\cr
&\underline{
  \text{WaitOpen}_i():
}\cr
  &\enspace
    c\_\bullet \gets \text{WaitCommit}_i()
  \cr
  &\enspace
    \text{EndBroadcast}_i()
  \cr
  &\enspace
    (\hat{x}\_{\bullet}, \hat{r}\_{\bullet}) \Lsh_i(\star, 2)
  \cr
  &\enspace
  \colorbox{#fca5a5}{$
    \texttt{if } \exists j.\ \text{Hash}(\hat{x}_j, \hat{r}_j) \neq c_j:
  $}
  \cr
  &\enspace\enspace
  \colorbox{#fca5a5}{$
    \texttt{stop}(\star, 2)
  $}
  \cr
  &\enspace
    \texttt{return } \hat{x}\_{\bullet}
  \cr
\end{aligned}
}
}
\otimes
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^7_H$
}\cr
&\mu[\bullet], x_k, r_k \gets \bot\cr
&\ldots\cr
\cr
&\colorbox{bae6fd}{$
\underline{
  \Rsh_k(S, (\hat{x}\_\bullet, \hat{r}\_\bullet)):
}$}\cr
  &\enspace
    \texttt{for } j \in S \cap \mathcal{H}.\ \text{Hash}(\hat{x}_j, \hat{r}_j) \neq \text{Hash}(x_k, r_k):
  \cr
  &\enspace\enspace
    \texttt{stop}(\\{j\\}, 2)
  \cr
  &\enspace
    \Rsh_k(S, (\hat{x}\_\bullet, \hat{r}\_\bullet))
  \cr
\end{aligned}
}
}
\cr
  \circ
\cr
F[\text{Broadcast}'] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

(red parts deleted).

Next, it's indifferentiable to check direct equality.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^8_H$
} = \Gamma^7_H\cr
\end{aligned}
}
}
\otimes
\boxed{
\small{
\begin{aligned}
&\colorbox{FBCFE8}{\large
  $\Gamma^8_H$
}\cr
&\ldots\cr
\cr
&\underline{
  \Rsh_k(S, (\hat{x}\_\bullet, \hat{r}\_\bullet), 2):
}\cr
  &\enspace
  \colorbox{bae6fd}{$
    \texttt{for } j \in S \cap \mathcal{H}.\ (\hat{x}_j, \hat{r}_j) \neq (x_k, r_k):
  $}
  \cr
  &\enspace\enspace
    \texttt{stop}(\\{j\\}, 2)
  \cr
  &\enspace
    \Rsh_k(S, (\hat{x}\_\bullet, \hat{r}\_\bullet))
  \cr
\end{aligned}
}
}
\cr
  \circ
\cr
F[\text{Broadcast}'] \otimes F[\text{Sync}(1)] \otimes F[\text{SyncComm}] \otimes F[\text{Hash}]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

At this point, the malicious party can't actually send honest
parties an opened value that's any different than the one they
used to generate their initial broadcast hash.
We can now rewrite the adversary to use the ideal commitment
functionality instead.

$$
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{bae6fd}{\large
  $\Gamma^9_H$
}\cr
\cr
&\underline{
  (1)\text{SetCommit}_i(x):
}\cr
  &\enspace
    \text{SetCommit}_i(x)
  \cr
\cr
&\underline{
  \text{Commit}_i():
}\cr
  &\enspace
    \text{Commit}_i(\star)
  \cr
\cr
&\underline{
  \text{WaitCommit}_i():
}\cr
  &\enspace
    \text{WaitCommit}_i(\star)
  \cr
  &\enspace
    \text{Sync}_i(\star)
  \cr
\cr
&\underline{
  \text{Open}_i():
}\cr
  &\enspace
    \text{Open}_i(\star)
  \cr
\cr
&\underline{
  \text{WaitOpen}_i():
}\cr
  &\enspace
    \text{WaitCommit}_i()
  \cr
  &\enspace
    \text{WaitSync}_i(\star)
  \cr
  &\enspace
    \texttt{return } \text{WaitOpen}_i(\star)
  \cr
\end{aligned}
}
}
\otimes
\begin{matrix}
\boxed{
\small{
\begin{aligned}
&\colorbox{bae6fd}{\large
  $\Gamma^9_H$
}\cr
&\ldots\cr
\cr
&\underline{
  \text{SetBroadcast}_k(h):
}\cr
  &\enspace
    \texttt{assert } h \in \mu
  \cr
  &\enspace
    h_k \gets h
  \cr
  &\enspace
    \text{SetCommit}_k(\mu[h])
  \cr
\cr
&\underline{
  \text{SendBroadcast}_k(S):
}\cr
  &\enspace
  \hat{h}\_{kj} \gets h_k \ (\forall j \in S \cap \mathcal{m})
  \cr
  &\enspace
    \text{Commit}_k(S)
  \cr
\cr
&\underline{
  \text{GetBroadcast}_k(S):
}\cr
  &\enspace
    \text{WaitCommit}_k(S)
  \cr
  &\enspace
    \texttt{for } j \in S \cap \mathcal{H}.\ c_j = \bot:
  \cr
  &\enspace\enspace
    c_j \xleftarrow{\\$} \texttt{01}^{2\lambda}
  \cr
  &\enspace
    \texttt{return } \begin{bmatrix}
      c_j &\mid j \in S \cap \mathcal{H} \cr
      \hat{h}\_{jk} &\mid j \in S \cap \mathcal{M}
    \end{bmatrix}
  \cr
\cr
&\underline{
  \Rsh_k(S, \hat{m}\_\bullet, 2):
}\cr
  &\enspace
    (\hat{x}\_\bullet, \hat{r}\_\bullet) \gets \hat{m}\_\bullet
  \cr
  &\enspace
    \texttt{for } j \in S \cap \mathcal{H}.\ (\hat{x}_j, \hat{r}_j) \neq (x_k, r_k):
  \cr
  &\enspace\enspace
    \texttt{stop}(\\{j\\}, 2)
  \cr
  &\enspace\enspace
    S \gets S / \\{j\\}
  \cr
  &\enspace
    m\_{kj} \gets (\forall j \in S \cap \mathcal{M})
  \cr
  &\enspace
    \text{Open}_k(S)
  \cr
\cr
&\underline{
  \Lsh_k(S, 2):
}\cr
  &\enspace
    \text{xr}\_\bullet \gets \text{WaitOpen}_k(S)
  \cr
  &\enspace
    \texttt{return } \begin{bmatrix}
      \text{xr}_j &\mid j \in S \cap \mathcal{H}\cr
      m\_{kj} &\mid j \in S \cap \mathcal{M}
    \end{bmatrix}
  \cr
\cr
&\underline{
  \text{Hash}(x, r):
}\cr
  &\enspace
    h \gets \text{Hash}'(x, r)
  \cr
  &\enspace
    \mu[h] \gets (x, r)
  \cr
  &\enspace
    \texttt{return } h
  \cr
\cr
&\underline{
  \text{Hash}'(x, r):
}\cr
  &\enspace
    \texttt{if } \exists k \in \mathcal{M}, j \in \mathcal{H}.\ \texttt{nowait}\Lsh_k(\\{j\\}, 2) = (x, r):
  \cr
  &\enspace\enspace
    \texttt{if } \exists k \in \mathcal{M}, j \in \mathcal{H}.\ \texttt{nowait } \text{GetBroadcast}(\\{j\\}) \to c_j:
  \cr
  &\enspace\enspace\enspace
    \texttt{return } c_j
  \cr
  &\enspace
    \texttt{return } \text{Hash}(x, r)
  \cr
\end{aligned}
}
}\cr
\otimes\cr
1(\text{Sync}_k, \text{WaitSync}_k, \texttt{stop}) \otimes F[\text{Hash}]
\end{matrix}
\cr
  \circ
\cr
F[\text{IdealCommit}] \otimes F[\text{Sync}(1)]
\circledcirc F[\text{Stop}]
\end{matrix}
$$

This is fact a simulator over $\mathscr{P}[IdealCommit]$,
concluding our proof.

$\blacksquare$