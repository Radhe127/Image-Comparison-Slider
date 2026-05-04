package com.sortvisualizer.service;

import com.sortvisualizer.model.SortResponse;
import com.sortvisualizer.model.SortStep;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SortingService {

    // ─────────────────────────────────────────────
    //  BUBBLE SORT  O(n²)
    // ─────────────────────────────────────────────
    public SortResponse bubbleSort(int[] inputArr) {
        int[] arr = Arrays.copyOf(inputArr, inputArr.length);
        List<SortStep> steps = new ArrayList<>();
        int n = arr.length;
        int comparisons = 0, swaps = 0;

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                steps.add(new SortStep("COMPARE", new int[]{j, j + 1}));
                comparisons++;
                if (arr[j] > arr[j + 1]) {
                    steps.add(new SortStep("SWAP", new int[]{j, j + 1}));
                    swaps++;
                    int temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;
                }
            }
            steps.add(new SortStep("SORTED", n - 1 - i));
        }
        steps.add(new SortStep("SORTED", 0));
        return new SortResponse(steps, arr, comparisons, swaps);
    }

    // ─────────────────────────────────────────────
    //  SELECTION SORT  O(n²)
    // ─────────────────────────────────────────────
    public SortResponse selectionSort(int[] inputArr) {
        int[] arr = Arrays.copyOf(inputArr, inputArr.length);
        List<SortStep> steps = new ArrayList<>();
        int n = arr.length;
        int comparisons = 0, swaps = 0;

        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                steps.add(new SortStep("COMPARE", new int[]{minIdx, j}));
                comparisons++;
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                steps.add(new SortStep("SWAP", new int[]{i, minIdx}));
                swaps++;
                int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
            }
            steps.add(new SortStep("SORTED", i));
        }
        steps.add(new SortStep("SORTED", n - 1));
        return new SortResponse(steps, arr, comparisons, swaps);
    }

    // ─────────────────────────────────────────────
    //  INSERTION SORT  O(n²)
    // ─────────────────────────────────────────────
    public SortResponse insertionSort(int[] inputArr) {
        int[] arr = Arrays.copyOf(inputArr, inputArr.length);
        List<SortStep> steps = new ArrayList<>();
        int n = arr.length;
        int comparisons = 0, swaps = 0;

        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0) {
                steps.add(new SortStep("COMPARE", new int[]{j, j + 1}));
                comparisons++;
                if (arr[j] > key) {
                    steps.add(new SortStep("SWAP", new int[]{j, j + 1}));
                    swaps++;
                    arr[j + 1] = arr[j];
                    j--;
                } else {
                    break;
                }
            }
            arr[j + 1] = key;
        }
        // Mark all sorted at end
        for (int i = 0; i < n; i++) {
            steps.add(new SortStep("SORTED", i));
        }
        return new SortResponse(steps, arr, comparisons, swaps);
    }

    // ─────────────────────────────────────────────
    //  MERGE SORT  O(n log n) – uses OVERWRITE steps
    // ─────────────────────────────────────────────
    public SortResponse mergeSort(int[] inputArr) {
        int[] arr = Arrays.copyOf(inputArr, inputArr.length);
        List<SortStep> steps = new ArrayList<>();
        int[] comparisons = {0}, swaps = {0};

        mergeSortHelper(arr, 0, arr.length - 1, steps, comparisons, swaps);

        for (int i = 0; i < arr.length; i++) {
            steps.add(new SortStep("SORTED", i));
        }
        return new SortResponse(steps, arr, comparisons[0], swaps[0]);
    }

    private void mergeSortHelper(int[] arr, int l, int r, List<SortStep> steps,
                                  int[] comparisons, int[] swaps) {
        if (l >= r) return;
        int mid = (l + r) / 2;
        mergeSortHelper(arr, l, mid, steps, comparisons, swaps);
        mergeSortHelper(arr, mid + 1, r, steps, comparisons, swaps);
        merge(arr, l, mid, r, steps, comparisons, swaps);
    }

    private void merge(int[] arr, int l, int mid, int r, List<SortStep> steps,
                       int[] comparisons, int[] swaps) {
        int[] left  = Arrays.copyOfRange(arr, l, mid + 1);
        int[] right = Arrays.copyOfRange(arr, mid + 1, r + 1);
        int i = 0, j = 0, k = l;

        while (i < left.length && j < right.length) {
            steps.add(new SortStep("COMPARE", new int[]{l + i, mid + 1 + j}));
            comparisons[0]++;
            if (left[i] <= right[j]) {
                steps.add(new SortStep("OVERWRITE", k, left[i]));
                arr[k++] = left[i++];
            } else {
                steps.add(new SortStep("OVERWRITE", k, right[j]));
                arr[k++] = right[j++];
                swaps[0]++;
            }
        }
        while (i < left.length) {
            steps.add(new SortStep("OVERWRITE", k, left[i]));
            arr[k++] = left[i++];
        }
        while (j < right.length) {
            steps.add(new SortStep("OVERWRITE", k, right[j]));
            arr[k++] = right[j++];
        }
    }

    // ─────────────────────────────────────────────
    //  QUICK SORT  O(n log n) average
    // ─────────────────────────────────────────────
    public SortResponse quickSort(int[] inputArr) {
        int[] arr = Arrays.copyOf(inputArr, inputArr.length);
        List<SortStep> steps = new ArrayList<>();
        int[] comparisons = {0}, swaps = {0};

        quickSortHelper(arr, 0, arr.length - 1, steps, comparisons, swaps);

        for (int i = 0; i < arr.length; i++) {
            steps.add(new SortStep("SORTED", i));
        }
        return new SortResponse(steps, arr, comparisons[0], swaps[0]);
    }

    private void quickSortHelper(int[] arr, int low, int high, List<SortStep> steps,
                                  int[] comparisons, int[] swaps) {
        if (low < high) {
            int pi = partition(arr, low, high, steps, comparisons, swaps);
            steps.add(new SortStep("SORTED", pi));
            quickSortHelper(arr, low, pi - 1, steps, comparisons, swaps);
            quickSortHelper(arr, pi + 1, high, steps, comparisons, swaps);
        }
    }

    private int partition(int[] arr, int low, int high, List<SortStep> steps,
                           int[] comparisons, int[] swaps) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            steps.add(new SortStep("COMPARE", new int[]{j, high}));
            comparisons[0]++;
            if (arr[j] < pivot) {
                i++;
                steps.add(new SortStep("SWAP", new int[]{i, j}));
                swaps[0]++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        steps.add(new SortStep("SWAP", new int[]{i + 1, high}));
        swaps[0]++;
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }

    // ─────────────────────────────────────────────
    //  HEAP SORT  O(n log n)
    // ─────────────────────────────────────────────
    public SortResponse heapSort(int[] inputArr) {
        int[] arr = Arrays.copyOf(inputArr, inputArr.length);
        List<SortStep> steps = new ArrayList<>();
        int n = arr.length;
        int comparisons = 0, swaps = 0;

        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            int[] c = {comparisons}, s = {swaps};
            heapify(arr, n, i, steps, c, s);
            comparisons = c[0]; swaps = s[0];
        }

        // Extract elements
        for (int i = n - 1; i > 0; i--) {
            steps.add(new SortStep("SWAP", new int[]{0, i}));
            swaps++;
            int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
            steps.add(new SortStep("SORTED", i));
            int[] c = {comparisons}, s = {swaps};
            heapify(arr, i, 0, steps, c, s);
            comparisons = c[0]; swaps = s[0];
        }
        steps.add(new SortStep("SORTED", 0));
        return new SortResponse(steps, arr, comparisons, swaps);
    }

    private void heapify(int[] arr, int n, int i, List<SortStep> steps,
                          int[] comparisons, int[] swaps) {
        int largest = i;
        int left    = 2 * i + 1;
        int right   = 2 * i + 2;

        if (left < n) {
            steps.add(new SortStep("COMPARE", new int[]{left, largest}));
            comparisons[0]++;
            if (arr[left] > arr[largest]) largest = left;
        }
        if (right < n) {
            steps.add(new SortStep("COMPARE", new int[]{right, largest}));
            comparisons[0]++;
            if (arr[right] > arr[largest]) largest = right;
        }
        if (largest != i) {
            steps.add(new SortStep("SWAP", new int[]{i, largest}));
            swaps[0]++;
            int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
            heapify(arr, n, largest, steps, comparisons, swaps);
        }
    }
}
