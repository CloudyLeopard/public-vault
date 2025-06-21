Three clauses for [[Scope (OpenMP)]]:
- `default(... or None)`
- `shared(...)`: makes private variables global/shared
- `private(...)`: makes global/shared variables private

## `default`

Lets the programmer specify the scope of each variable in a block
```C
default(none)
```

With this clause the compiler will require that we specify (by hand) the scope of each variable we use in the block and that has been declared outside the block.

This is extra work but its good for readability - inside of remembering the default rules, you will force by hand what is shared and what is private.

(example from [[Estimating Pi]])
```C
double sum = 0.0;
# pragma omp parallel for num_threads(thread_count) \
	default(none) reduction(+:sum) private(k, factor) \
	shared(n)
for (k = 0; k < n; k++) {
	if (k % 2 == 0)
		factor = 1.0;
	else
		factor = -1.0;
		
	sum += factor / (2*k+1);
}
pi_approx = 4.0*sum;
```

`default(none)` removes *all* the default rules. And now you can redeclare the variables as private or shared.

This includes array! If inside for loop there is an array `a`, the name of the array *must appear in the clause* `private` or `shared`. If you have used `default(none)` and removed all the default rules, you cannot then tell OpenMP to decide.