package com.sortvisualizer.model;

import java.util.List;

public class SortResponse {
    private List<SortStep> steps;
    private int[] sortedArray;
    private int   comparisons;
    private int   swaps;

    public SortResponse(List<SortStep> steps, int[] sortedArray, int comparisons, int swaps) {
        this.steps       = steps;
        this.sortedArray = sortedArray;
        this.comparisons = comparisons;
        this.swaps       = swaps;
    }

    public List<SortStep> getSteps()       { return steps; }
    public int[]          getSortedArray() { return sortedArray; }
    public int            getComparisons() { return comparisons; }
    public int            getSwaps()       { return swaps; }
}
