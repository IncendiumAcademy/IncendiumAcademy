---
layout: lesson
title: Geometric Sequences
author: Jae Gwan Park
parent: Sequences and Series
grand_parent: Algebra
---

1. TOC
{:toc}

**A geometric sequence is a sequence with a common ratio between consecutive terms.**

In this lesson we explain three of the most important subtopics of geometric sequences.

## The General Term

In a geometric sequence, the $$n$$'th term or general term is:

$$
t_n= ar^{n-1}
$$

where $a$ is the first term in our sequence, and the common ratio is $r$. 

> **Note:** sequences are discrete functions, so $$n \in \mathbb{N} = \{1,2,3,\ldots \}$$.

To familiarize ourselves with this definition, let's do 2 *easy* examples. 

### Example 1

In a geometric sequence, $$t_3=20$$ and $$t_6=1280$$. What is the first term?

<details>
    <summary> Solution </summary>
    <p>
        $$
        \begin{align*}
        t_3 &= ar^2 = 20\\
        t_6 &= ar^5 = 1280 
        \end{align*}
        $$
		Dividing $t_6$ by $t_3$ gets rid of $a$, and we are left with:
        $$
        r^3 = \frac{1280}{20} = 64 = 4^3
        $$
        $$
        \therefore r = 4
        $$
        Plugging in $r = 4$ into $ar^2 = 20$:
        $$
        \begin{align*}
          16a &=20\\
          \therefore a &=5/4
        \end{align*}
        $$
        $\therefore$ the first term is 5/4.
    </p>
    <b>QED</b>
</details>

### Example 2
Find the first term and common ratio of each geometric sequence with the following general terms $t_n$.
{% raw %}
1. $3 \cdot 2^{2n+1}$ 

2. $3^{-n}$
{% endraw %}
   
<details>
    <summary> Solution </summary>
    <p>
    Let the first term be $a$ and the common ration be $r$ for both solutions.
    </p>
    <p>
    1. $t_n = 3 \cdot 2^{2n+1} = 6 \cdot 2^{2n} = 6 \cdot 4^n = (6 \cdot 4) \cdot 4^{n-1} = 24 \cdot 4^{n-1}$
        $\therefore a = 24$ and $r=4$.
    </p>
    <p>
    2. $t_n=3^{-n} = 3^{-(n-1)} \cdot \frac{1}{3} = \frac{1}{3} \cdot (\frac{1}{3})^{n-1}$
    $\therefore a = \frac{1}{3}$ and $r=\frac{1}{3}$.
    </p>
    <b>QED</b>
</details>

---

## Geometric Mean

The geometric mean is **the middle number** $m$, when $a, m,$ and $b$ form a geometric sequence **in that order.**

Consequently we can derive:

$$
\frac{m}{a}=\frac{b}{m} = r\\
$$

$$
\therefore m^2 = ab
$$

In fact, we can extend this theorem. Since all terms are evenly spaced by a ratio $r$, 

$$t_a \cdot t_b = t_c \cdot t_d$$, only if $a+b = c+d$.

### Example 1
Find integer(s) $x$ so that $x, x+4,$ and $4x+10$ form a geometric sequence.

<details>
    <summary> Solution </summary>
    <p>
    Applying the geometric mean, $(x+4)^2 = x(4x+10)$.
    </p>
    <p>
    We can simply solve for this quadratic for $x=-\frac{8}{3}$ or $x=2$.
    Since $x$ must be integer, $\therefore x=2$.
    </p>
    <b>QED</b>
</details>

---

## Recursive Formula

Geometric sequences can also be written through a recursive formula, where the $n$th term is a product of the $(n-1)$th term and the common ratio. 
In recursive form, the first term must be defined.

Comparing the explicit (general) and recursive forms:

Explicit:
$$
t_n=ar^{n-1}
$$


Recursive:
$$
t_1=a, \; t_n = t_{n-1} \cdot r, (n=2,3,4,\ldots)
$$

---

## Worked Contest Problems

Below we work through notable problems that have appeared on past contests. 
Attempt these on your own first, and only reference the solutions if you're stuck.

### Simpler Problems

##### Euclid 2014 6b

The geometric sequence with $n$ terms $t_1, t_2, \ldots, t_{n-1}, t_n$, has $t_1 t_n = 3$. 
Also, the product of all $n$ terms equals $59049$. Determine the values of $n$.

<details>
    <summary> Solution </summary>
    <p>
    Here's a scenario where I'd say brute forcing actually works. 
    <br>
    Evaluating: 
    $$
    \begin{align*}
        t_1 \cdot t_2 \cdot \ldots \cdot t_{n-1} \cdot t_n &=59049\\
        a \cdot ar \cdot \ldots ar^{n-2} \cdot ar^{n-1} &= 59049\\
        (a)^n \cdot (r \cdot r^2 \ldots r^{n-1}) &= 59049\\
        a^n \cdot r^{\frac{1}{2}n(n-1)} &= 59049 \; \; (1)
    \end{align*}
    $$
    </p>
    <p>
    Now let's look at what else we were given. From $t_1 t_n = 3$, 
    $$
    \begin{align*}
        (a)(ar^{n-1}) &=3\\
        a^2 r^{n-1} &=3 \; \; \; \; \; \; (2)
    \end{align*}
    $$
    </p>
    <p>
    Note that $(1)$ and $(2)$ are close to each other. We can raise $(2)$ to the $n$th power, getting;
    $$
    \begin{align*}
        (a^2 r^{n-1})^n &= 3^n\\
        a^{2n} r^{n(n-1)} &= 3^n
    \end{align*}
    $$
    We can further raise both sides to the $\frac{1}{2}$ power, getting;
    $$
    \begin{align*}
        (a^{2n} r^{n(n-1)})^{\frac{1}{2}} &= (3^n)^\frac{1}{2}\\\\
        (a^n r^{\frac{1}{2}(n)(n-1)}) &= 3^{\frac{n}{2}} \;\;\;\;\;\;\;\;\; (3)
    \end{align*}
    $$
    Since $(3) = (1)$, we can conclude $3^\frac{n}{2} = 59049 = 3^{10}$
    $$
    \therefore n = 2 \cdot 10 = 20.
    $$
    <b>QED</b>
    </p>
</details>

##### Euclid 2010 5b

A geometric sequence has 20 terms.
The sum of its first two terms is 40.
The sum of its first three terms is 76.
The sum of its first four terms is 130.
Determine how many of the terms in the sequence are integers.

<details>
    <summary> Solution </summary>
    <p>
    You can find out what the third and fourth terms are, by taking the difference between the first two and first three terms; and the first three and first four terms respectively.
    $\therefore$ the third term is $76-40=36$ and the fourth term is $130-76=54$.
    </p>
    <p>
    We can then find the common ratio, by dividing these numbers.
    $$\therefore r=\frac{54}{36}=\frac{3}{2}$$
    </p>
    <p>
    Next, we want to find the first term of the sequence, so that we can derive the general term.
    To do this, we simply divide by $\frac{3}{2}$ from the third term twice. 
    $$
    \begin{align*}
        t_1 &= 36 \cdot \frac{2}{3} \cdot \frac{2}{3}\\
        \therefore t_1 &= 16.
    \end{align*}
    $$  
    $$
    \therefore t_n = 2^4 (\frac{3}{2})^{(n-1)}.
    $$
    </p>
    <p>
    Recall that the question asked for the number of integers in the sequence. By observing the general term, we can see that values of $n>5$ will yield a fractional term.
    </p>
    <p>
    Therefore, there will be 5 integers in this sequence.
    </p>
    <b>QED</b>
</details>

### Harder Problems

Harder problems often incorporate other math topics, like logarithms, systems of equations, etc.
##### Euclid 2009 9a
If $\log_2 x, (1 + \log_4 x)$, and $\log_8 4x$ are consecutive terms of a geometric sequence, determine the possible values of $x$.

<details>
    <summary> Solution </summary>
    <p>
    It's best practice to simplify the logarithms to the same base. Let's set all the bases to 2.
    </p>
    <p>
    For the second term:
    $$1+\log_4x = 1 + \frac{\log_2 x}{\log_2 4} = 1 + \frac{\log_2 x}{2} = 1+\frac{1}{2}\log_2x$$
    For the third term:
    $$\log_8 4x=\frac{\log_2 4x}{\log_2 8} = \frac{\log_2 4 + \log_2 x}{3} = \frac{2}{3} + \frac{\log_2 x}{3}$$
    </p>
    <p>
    To keep things cleaner in our solution, let's substitute $\log_2 x = y$.
    Since the three terms are consecutive terms in a geometric sequence, we can then use our geometric mean.
    $$
    \begin{align*}
        \frac{\frac{2}{3} + \frac{y}{3}}{1 + \frac{y}{2}} &= \frac{1 + \frac{y}{2}}{y}\\
        y\left(\frac{2}{3} + \frac{y}{3}\right) &= \left(1+\frac{y}{2}\right)^2\\
        \frac{2}{3}y + \frac{y^2}{3} &= 1 + y + \frac{1}{4}y^2\\
        8y + 4y^2 &= 12 + 12y + 3y^2\\
        y^2 - 4y - 12 &=0\\
        (y-6)(y+2)&=0
    \end{align*}
    $$
    </p>
    <p>
        From this quadratic, we see that $y= \log_2 x = 6$ or $-2$.
        <br>
        $\therefore x = 2^6 = 64$ or $x= 2^{-2}= \frac{1}{4}$
    </p>
    <b>QED</b>
</details>


##### 2004 AMC 10A P18

##### 2010 AMC 10B P16

AMC problems and solutions coming soon.