package com.sahil.edna.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "alpha_diversity_data")
@Data
@NoArgsConstructor
public class AlphaDiversityData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String metric;
    private double value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sample_data_id")
    private SampleData sampleData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMetric() {
        return metric;
    }

    public void setMetric(String metric) {
        this.metric = metric;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public SampleData getSampleData() {
        return sampleData;
    }

    public void setSampleData(SampleData sampleData) {
        this.sampleData = sampleData;
    }
}