import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

export function BookingItem() {
  return (
    <Card>
      <CardContent className="flex justify-between p-0">
        {/* LEFT */}
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge className="w-fit">Confirmado</Badge>

          <h3 className="font-bold">Corte de Cabelo</h3>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src="https://github.com/matheushdmoreira.png" />
            </Avatar>

            <p className="text-sm">Barbearia FSW</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
          <p className="text-sm">Agosto</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">10:45</p>
        </div>
      </CardContent>
    </Card>
  )
}
