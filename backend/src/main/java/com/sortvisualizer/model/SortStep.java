package com.sortvisualizer.model;

/**
 * Represents a single animation step during sorting.
 *
 * Types:
 *  COMPARE  - Two indices are being compared (turn red/yellow)
 *  SWAP     - Two indices are being swapped (swap heights + color)
 *  OVERWRITE- One index gets a new value (used in Merge sort)
 *  SORTED   - Mark a specific index as sorted (turn green)
 */
public class SortStep {

    private String type;
    private int[] indices;   // up to 2 indices involved
    private int index;       // for OVERWRITE: target index
    private int value;       // for OVERWRITE: new value

    public SortStep() {}

    // COMPARE / SWAP constructor
    public SortStep(String type, int[] indices) {
        this.type = type;
        this.indices = indices;
        this.index = -1;
        this.value = -1;
    }

    // OVERWRITE constructor
    public SortStep(String type, int index, int value) {
        this.type = type;
        this.indices = new int[]{};
        this.index = index;
        this.value = value;
    }

    // SORTED constructor
    public SortStep(String type, int index) {
        this.type = type;
        this.indices = new int[]{};
        this.index = index;
        this.value = -1;
    }

    public String getType()       { return type; }
    public int[]  getIndices()    { return indices; }
    public int    getIndex()      { return index; }
    public int    getValue()      { return value; }

    public void setType(String type)       { this.type = type; }
    public void setIndices(int[] indices)  { this.indices = indices; }
    public void setIndex(int index)        { this.index = index; }
    public void setValue(int value)        { this.value = value; }
}
