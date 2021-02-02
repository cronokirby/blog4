---
title: "Tychonoff's Theorem and Zorn's Lemma"
date: 2021-02-02T11:20:32+01:00
draft: true
katex: true
tags:
  - Math
  - "Set Theory"
  - Topology
---

Tychnoff's theorem proves that the product (even infinite) of compact spaces
is also compact. The proof makes judicious use of Zorn's lemma, and made
me appreciate how fun its application can be.

<!--more-->

In this post, I'll be going over the notion of *Product space* and *Compact space*,
building up to the final result.

I think that the final proof makes elegant use of a powerful tool:
Zorn's lemma. This use is so elegant, in fact, that as soon as I first read
the proof, I felt compelled to write a blog post exposing the proof,
and trying to describe its elegance to others.

All the proofs are inspired by Munkres {{<ref-link "1">}}, which is the standard
introductory text on Topology. I won't be going over the basics of Topological
spaces and continuous functions here, so I recommend this book if you'd like
to see these fundamentals, or learn more about Topology.

# Products

## Finite Products

## Extending to the infinite case

# Compactness

## A notion of smallness

**TODO: Add prerequisite theorems here**

# Tychonoff's Theorem

We've seen the notion of a *Product* and of *Compactness*. A natural
question to ask is whether these properties are compatible:

Given a collection $\\{X_\alpha\\}$ of compact spaces, is the product $\prod_{\alpha} X_\alpha$
also a compact space?

Tychnoff's theorem answers this with a definitive **yes**.

## A rough idea, and a problem

It's more convenient to use the finite intersection version of compactness here.
Given a collection $\mathcal{A}$ of closed subsets of our product space, with
the finite intersection property, we need to find a point in the intersection $\bigcap \mathcal{A}$.

The idea is that we can find this point component by component, using that fact that each part
of our product space is already compact.

Concretely, consider the product $[0, 1] \times [0, 1]$. Let $a = (\frac{1}{3}, \frac{1}{3})$
and $b = (\frac{2}{3}, \frac{2}{3})$. Our collection $\mathcal{A}$ consists of rectangles
centered along the segment $ab$:

{{<img "1.png">}}

This has the finite intersection property. This is because for any two rectangles centered
on this line, the
smaller one will always be contained in the larger one.

In fact, we can see the final intersection of this collection. It is the
segment $ab$ itself:

{{<img "2.png">}}

If we project each rectangle down to one of the intervals, we get a nested
set of closed intervals, eventually reaching $[\frac{1}{3}, \frac{2}{3}]$:

{{<img "3.png">}}

Now, the rough idea we had earlier was to pick a point in the intersection
of each projection, and then use that. Let's say we pick $\frac{1}{3}$ and $\frac{2}{3}$.
The problem is that $(\frac{1}{3}, \frac{2}{3})$ is not in the intersection
$\bigcap \mathcal{A}$,
in the product $[0, 1] \times [0, 1]$:

{{<img "4.png">}}

It's possible to make the "wrong" choice when considering each of the points individually.
We need to use the way that our collection $\mathcal{A}$ puts constraints
on each component *at the same time*, when considering how to make each component.
We've gotten rid of this global information by limiting ourselves to considering
just the component collections $\pi_X(\mathcal{A})$, and $\pi_Y(\mathcal{A})$.

We can amend this by choosing a collection of sets that contains $\mathcal{A}$.
Let's now add in all the rectangles centered on the same segment $ab$,
but where the "top" can vary as well:

{{<img "5.png">}}

Now this collection "hones in" precisely on the point $(\frac{1}{3}, \frac{1}{3})$,
and our method of construction works, since the projections of this set have
to end up at $\frac{1}{3}$ as well.

### Lessons Learned

In a sense, the collection $\mathcal{A}$ was not strict enough to force
each component to be coherent, and so it was possible to make the "wrong" choice.
We have too much freedom in our choice for each component, so it's possible
to not respect the conditions that $\mathcal{A}$ imposes only on the *product space*.

Now, in this specific case, it's easy to find a collection $\mathcal{B} \supseteq \mathcal{A}$
that that's strong enough to force our components to be coherent. But in general,
we can't leave this up to chance or observation, we need a fool-proof method
to make this work.

What we're going to do is simply consider all such collections. If we consider
the biggest set with the finite intersection property that contains $\mathcal{A}$,
we'll be able to use all of the insight we could ever gleam from picking
a collection by hand.

Another way to think about this is that for any collection $\mathcal{C}$,
we can find an intersection of $\overline{\pi_\alpha(\mathcal{C})}$
by compactness. If we restrict ourselves to just doing this for the one collection
we've been given, we're not exercising the full power of compactness.
The more sets are in a collection the more "difficult" it is to find a point
in the intersection of these sets. By using the biggest possible collection
containing $\mathcal{A}$, we exercise the full power of our assumption that
$X_\alpha$ is compact.

## Zorn's Lemma

What we want to do now

## The biggest FIP

# Conclusion

{{<ref
  "1"
  "https://www.pearson.com/us/higher-education/product/Munkres-Topology-2nd-Edition/9780131816299.html"
  "[1] Munkres, James R. Topology; a First Course. Prentice-Hall, 1974.">}}