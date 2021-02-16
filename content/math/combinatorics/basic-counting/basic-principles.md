---
layout: lesson
title: Basic Counting Principles
author: Max Li
parent: Basic Principles and Techniques
grand_parent: Combinatorics
---
1. TOC
{:toc}

## Introduction

In this section we'll introduce some basic counting principles. A solid understanding of these principles is crucial before progressing into more complicated counting techniques as they are fundamentally inherent in all counting problems. 

In math problems and even our everyday lives, we often need to enumerate objects and events. For example, we all know how to count the number of students in a class. Or the number of socks in a drawer. However, most counting problems do not involve simply counting a list of items one by one. Thus, we will need better strategies and counting techniques when approaching such problems.  

## The Addition Principle 

Aristotle or whatever ancient philosopher might've argued that *the whole is greater than the sum of its parts*. However, as far as we're concerned in counting, the whole is **equal** to the sum of its parts (it might even be less!). The **addition principle** states that 

> if there are $k$ events $E_1,E_2,\dots,E_k$ which happen in $n_1,n_2,\dots,n_k$ ways respectively, and the ways for the events to occur are **pairwise disjoint**, then the number of ways for a singular outcome to occur is $n_1+n_2+\dots+n_k$.

Or, in a more set theoretic notation,

> Let $S_1, S_2, \dots, S_k$ be **pairwise disjoint** sets, $S_i \cap S_j = \emptyset,\ i \neq j$. Then,

$$\left| \bigcup_{i=1}^{k} S_i \right| = |S_1 \cup S_2 \cup \dots \cup S_k| = |S_1| + |S_2| + \dots + |S_k| $$ 

Note that there is an emphasis on the events/sets being pairwise disjoint. This means that an outcome for an event is distinct from any other outcome. There should not be any overlaps.

Let's now look at an example problem that uses the addition principle. 

### Example 

We want to travel from city $A$ to city $B$. There are $5$ ways to travel by bus, $2$ ways of biking, and $1$ way of walking. How many ways can we travel from $A$ to $B$? 

<details>
    <summary> Solution </summary>
    <p>
        By the addition principle, the total number of ways is $5+2+1=8$. Simple huh? Don't let the simplicity downplay the importance of the addition principle though, you'll be using it <i>a lot</i> in counting problems. However, this is pretty much the full extent of which the addition principle can be used alone. To solve more complicated problems, we will need to combine its use with other counting principles. 
    </p>
</details>

## The Multiplication Principle

The multiplication principle will be involved when events don't happen in just one step. It states that 

> Assume an event $E$ can be broken down into $k$ ordered events $E_1,E_2,\dots,E_K$ and that there are $n_1$ ways for $E_1$ to occur, $n_2$ ways for $E_2$ to occur, . . ., and $n_k$ ways for $E_k$ to occur. Then the number of ways for $E$ to occur is given by $n_1\times n_2\times \ldots \times n_k$.

Or, in a more set theoretic notation,

> Let $S_1 \times S_2 \times \dots \times S_k = \\{(s_1,s_2,\dots,s_k)\mid s_i \in S_i\\}$ denote the cartesian product of the sets $S_1,S_2,\dots,S_k$. 

$$|S_1 \times S_2 \times \dots \times S_k| = |S_1| \times |S_2| \times \dots \times |S_k| $$ 

One thing to take note of is that the multiplication principle is only directly applicable when the events are **independent** (the outcome of one event won't affect the outcomes of another event). If the events are not indenendent then we need to take that into consideration when counting our outcomes.

Let's look at some problems involving the multiplication principle. 

### Example 1

You have $5$ shirts and $4$ pants. How many outfits can you make that consist of one shirt and one pair of pants. 

<details>
    <summary> Solution </summary>
    <p>
        We have $5$ choices for the shirt. Then for each shirt we have $4$ choices for the pants. Therefore the total number of outfits we can form is $4\times 5=20$. Notice that we could've chosen the pants before the shirt and the total would still remain the same. 
    </p>
</details>

### Example 2

If there are $6$ ways to get from $A$ to $B$ and $9$ ways to get from $B$ to $C$, how many ways are there to get from $A$ to $C$?

<details>
    <summary> Solution </summary>
    <p>
        This is another straightforward application of the multiplcation principle. The total number of ways to get from $A$ to $C$ will be $6\times 9=63$.
    </p>
</details>

### Example 3

How many divisors are there of $2^{1}\times 3^{2} \times 5^{1} \times 11^{4} \times 17^{3}$?

<details>
    <summary> Solution </summary>
    <p>
        This problem requires a little bit of number theoretic insight. A divisor of $2^{1}\times 3^{2} \times 5^{1} \times 11^{4} \times 17^{3}$ will be of the form $$2^{a}\times 3^{b} \times 5^{c} \times 11^{d} \times 17^{e}
        \text{, where }0\le a\le 1, 0\le b\le 2, 0\le c\le 1, 0\le d\le 4, 0\le e\le 3$$ There are $2$ choices for $a$, $3$ choices for $b$, $2$ choices for $c$, $5$ choices for $d$, and $4$ choices for $e$. Therefore, the number of divisors is $2\times 3 \times 2 \times 5 \times 4 = 240$.
    </p>
</details>

### Example 4

How many four-digit numbers have distinct and nonzero digits?

<details>
    <summary> Solution </summary>
    <p>
        This is an example of a problem which the events are not independent. If we choose a number for the current digit, we can't choose this number for any later digits. So we can't bindly apply the multiplication principle. However, what we can notice is that although the choices themselves are not independent at each step, the <i>number</i> of choices is. For example, the first digit always has $9$ choices, the numbers from $1$ through $9$. Let's say we choose $1$ as our first digit. Then the choices for the second digit are $2,3,\dots,9$, $8$ numbers in total. What would happen if we choose $2$ as our first digit? The choices for the second digit are $1,3,4,\dots,9$, also $8$ numbers in total. We can see that no matter what number we choose for our first digit, there will always be $8$ choices for the second digit. There will be $7$ choices for the third digit and $6$ choices for the the fourth digit. Therefore, the total amount of numbers that satisfy the constraints is $9\times 8\times 7\times 6= 3024$. 
    </p>
</details>

Example 4 is an example of a problem invoving **permutations**. This lesson will not be going into detail about them. The general idea of a permutation is to count the number of arrangements of some elements from a set. For Example 4, the problem is to count the number of arrangements of $4$ elements from the set $\\{1,2,\dots,9\\}$.