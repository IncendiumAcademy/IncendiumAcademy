---
layout: lesson
title: Gravity and Energy
author: Peter Lin
parent: Gravity
grand_parent: Classical Mechanics
---

## Potential Energy

Gravity is conservative force, which means that the work due to gravity is independent of the path of the object taken.
In consequence to this, we are able to assign a gravitational potential energy at every point in space.
Consider the path of an object on Earth from a height $h0$ to $h1$.
The work done is $-mg \varDelta h$, as the direction of $\varDelta h$ is the opposite sign as $g$.
The change in potential energy is the negative of work, so we have:

$$
\begin{equation}
    \varDelta U = mg \varDelta h
\end{equation}
$$

Note that this formula only works when the acceleration due to gravity (and the force of gravity) is assumed to be constant.
This is not true on large scales, such as the moon. To solve for work, we must use an integral, essentially adding values of
$\varDelta U$ for small increments of $\varDelta r$, where $r$ is the distance between the centers of the objects. We now have:

$$
\begin{equation}
    W = \int_{r_0}^{r_1} -\frac{GMm}{r^2}, dr = \frac{GMm}{r_1} - \frac{GMm}{r_0}
\end{equation}
$$

$$
\begin{equation}
    \varDelta U = -W = (-\frac{GMm}{r_1}) - (-\frac{GMm}{r_0}) = U(r_1) - U(r_2)
\end{equation}
$$

$$
\begin{equation}
    U(r) = -\frac{GMm}{r}
\end{equation}
$$

Notice that as $r$ approaches infinity, potential energy approaches 0.

## Orbital Energies

Suppose we want to find the escape velocity of an object on Earth.
This means that we need to find the energy it takes to bring the object from $r$ to infinity.
The energy required to being the object from $r$ to infinity is:

$$
\begin{equation}
    \frac{1}{2}mv^2 = \varDelta U = 0 - (-\frac{GMm}{r}) = \frac{GMm}{r}
\end{equation}
$$

$$
\begin{equation}
    v = \sqrt{\frac{2GM}{r}}
\end{equation}
$$

Notice that if the total energy (sum of potential and kinetic energy) is less than 0, then the object will not have
enough energy to reach infinity, and therefore will be in an orbit. From this we can conclude that if total energy $TE < 0$,
then the object will have an elliptical trajectory, if $TE = 0$ then the object will have a parabolic trajectory, and if $TE > 0$
then the object will have a hyperbolic trajectory. We will not prove the latter 2 statements in this lesson.

It is also useful to compute the total energy of objects in circular orbits. Remember that the total energy is the sum of kinetic
and potential energy, and that the orbit is constrained to a uniform circular motion:

$$
\begin{equation}
    \frac{mv^2}{r} = \frac{GMm}{r^2}
\end{equation}
$$

$$
\begin{equation}
    \frac{1}{2}mv^2 = \frac{GMm}{2r}
\end{equation}
$$

We add this to the expression for potential energy:

$$
\begin{equation}
    \frac{1}{2}mv^2 + U(r) = \frac{GMm}{2r} - \frac{GMm}{r} = -\frac{GMm}{2r} = \frac{1}{2}U(r)
\end{equation}
$$

Notice that just like potential energy increases as $r$ increases, the total energy increases as $r$ increases.
This means that adding energy to an orbiting energy will increase its orbital radius, but in return, its orbital speed will decrease.
The proof is left as an exercise to the reader.


## Gravitational Fields

The gravitational field type a type of force field, one specifically caused by the force of gravity.
Because gravity affects objects in the whole universe, we can assign a force vector to every point in space. The field
describes how a mass will react to a its force of gravity with the relationship $F = m \cdot \textbf{g}$. From this we have:

$$
\begin{equation}
    \textbf{g} = \frac{GM}{r^2}
\end{equation}
$$

Even though gravitational field is a vector quantity, we will use $\textbf{g}$ to denote its magnitude instead.

Let us try to find the gravitational field caused by multiple objects. We have:

$$
\begin{equation}
    \textbf{g}_{net} = m \cdot F_{net} = m \cdot \Sigma F = \Sigma m \cdot F = \Sigma \textbf{g}
\end{equation}
$$

Similarly to Newton's Second Law, the summation of fields gives the net field.
