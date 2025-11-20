import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="bg-card border transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-primary text-4xl font-bold">{value}</div>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
