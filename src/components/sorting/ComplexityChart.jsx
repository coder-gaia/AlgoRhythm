import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { COLORS } from "../../constants/colors";

/**
 * Gera pontos para as curvas teóricas de complexidade.
 * Para cada tamanho de array N, calcula o número aproximado de operações.
 */
function generateCurveData(maxN = 100) {
  const points = [];
  const step = Math.max(1, Math.floor(maxN / 40)); // máx 40 pontos no gráfico

  for (let n = 5; n <= maxN; n += step) {
    points.push({
      n,
      "O(n)": n,
      "O(n log n)": Math.round(n * Math.log2(n)),
      "O(n²)": n * n,
    });
  }

  return points;
}

/**
 * Quais complexidades cada algoritmo usa (para destacar a curva relevante).
 */
const ALGORITHM_COMPLEXITY = {
  bubble: "O(n²)",
  selection: "O(n²)",
  insertion: "O(n²)",
  merge: "O(n log n)",
  quick: "O(n log n)",
};

const CURVE_COLORS = {
  "O(n)": COLORS.emeraldLight,
  "O(n log n)": COLORS.yellow,
  "O(n²)": COLORS.wineLight,
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1A1A1A",
        border: `1px solid #222`,
        borderRadius: 8,
        padding: "10px 14px",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 12,
      }}
    >
      <p style={{ color: "#7A7570", marginBottom: 6 }}>n = {label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

/**
 * @param {string} algorithm - algoritmo selecionado (para destacar a curva)
 * @param {number} arraySize - tamanho atual do array (linha de referência)
 */
export function ComplexityChart({ algorithm, arraySize }) {
  const relevantCurve = ALGORITHM_COMPLEXITY[algorithm];
  const data = generateCurveData(Math.max(arraySize + 10, 60));

  return (
    <div className="complexity-chart-wrapper">
      <p className="control-label" style={{ marginBottom: 12 }}>
        Crescimento de operações por tamanho de array
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
        >
          <XAxis
            dataKey="n"
            tick={{
              fill: COLORS.muted,
              fontSize: 10,
              fontFamily: "JetBrains Mono, monospace",
            }}
            tickLine={false}
            axisLine={{ stroke: "#222" }}
            label={{
              value: "n (tamanho)",
              position: "insideBottomRight",
              offset: -4,
              fill: COLORS.muted,
              fontSize: 10,
            }}
          />
          <YAxis
            tick={{
              fill: COLORS.muted,
              fontSize: 10,
              fontFamily: "JetBrains Mono, monospace",
            }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Linha de referência: tamanho atual do array */}
          <ReferenceLine
            x={arraySize}
            stroke={COLORS.muted}
            strokeDasharray="4 3"
            label={{
              value: `n=${arraySize}`,
              position: "top",
              fill: COLORS.muted,
              fontSize: 10,
            }}
          />

          {Object.entries(CURVE_COLORS).map(([key, color]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={relevantCurve === key ? 2.5 : 1}
              strokeOpacity={relevantCurve === key ? 1 : 0.35}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          ))}

          <Legend
            wrapperStyle={{
              fontSize: 11,
              fontFamily: "JetBrains Mono, monospace",
              paddingTop: 8,
            }}
            formatter={(value) => (
              <span
                style={{
                  color:
                    relevantCurve === value
                      ? CURVE_COLORS[value]
                      : COLORS.muted,
                  fontWeight: relevantCurve === value ? 700 : 400,
                }}
              >
                {value}
                {relevantCurve === value ? " ← atual" : ""}
              </span>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
